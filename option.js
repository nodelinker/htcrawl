class Option {
  hasAutoLogin = false;
  hasProxy = false;
  hasRaysaasPolicyOption = false;
  hasAlarmOption = false;
  hasRuleSet = false;

  constructor() {
    this.jobId = -1;
    this.taskId = -1;
    this.siteId = -1;

    this.targetId = -1;
    this.url = "";
    this.crawlType = "depth-first";
    
    this.sessionMessage = "";

    this.autoLogin = {};

    // 过滤动态url
    this.isCommonFilter = false;

    // 是否暴力猜解url路径
    this.isBruteForce = false;

    // 是否只是爬取页面不做漏洞扫描
    this.isJustCrawl = false;
    this.concurrencyCount = 1;

    this.customHeader = {};
    this.customCookie = [];

    this.excludeParam = [];
    this.excludeUrlKeywords = [];
    this.excludeDir = [];
    this.excludeSuffix = [];
    this.responseUrlKeywords = [];
    this.elementNodes = [];
    this.destructiveOperation = [];

    this.proxyType = "http|socks5";
    this.proxyHost = "";
    this.proxyPort = 0;
    this.proxyUsername = "";
    this.proxyPassword = "";

    this.jsenvSleepTime = 10;
    this.functionSwitchDom0 = false;
    this.functionSwitchDom2 = false;
    this.functionSwitchSpa = false;
    this.functionSwitchForm = false;
    this.functionSwitchUrlDeduplication = false;

    this.maxRetry = 3;
    this.RetrySleep = 1000;
    this.timeout = 30000;

    this.customPlugin = []

    this.checkHiddenLink = false;
    this.checkHiddenKeyword = false;
    this.checkTorjan = false;
    this.checkSimilarPage = false;
    this.similarPageValue = 0.8;
    this.checkKeywordCasesense = false;

    this.inids = [];
    this.exfml = [];
    this.exids = [];
    this.plugin = [];

    this.alarmType = "mail";
    this.alarmTitle = "";
    this.alarmContent = "";

    this.createdAt = "";
    this.updatedAt = "";
  }

  getAlarmType() {
    switch (this.alarmType) {
      case "syslog":
        return "syslog";
      case "email":
        return "mail";
      case "sms":
        return "sms";
      case "wechat":
        return "wechat";
      default:
        return "mail";
    }
  }

  getProxyType() {
    switch (this.proxyType) {
      case "http":
        return "http";
      case "socks5":
        return "socks5";
      default:
        return "http";
    }
  }

  getCrawlType() {
    switch (this.crawlType) {
      case "depth-first":
        return "depth-first";
      case "breadth-first":
        return "breadth-first";
      default:
        return "depth-first";
    }
  }

  traverseObject(obj) {
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        console.log(prop + ": " + obj[prop]);
        if (typeof obj[prop] === "object") {
          traverseObject(obj[prop]);
        }
      }
    }
  }

  getProperty(obj, prop) {
    if (!obj.hasOwnProperty(prop)) {
      throw new Error(`Missing property: ${prop}`);
    }
    return obj[prop];
  }

  /**
   * 解析JSON数据
   * @returns {Object} 解析后的数据
   * @throws {Error} 如果数据不符合预期，将抛出异常
   * @memberof JsonParser
   * @example
   * const jsonData = {
   *  // JSON数据...
   * };
   *
   * try {
   *  const option = new Option();
   *  option.parse(jsonData);
   *  console.log(option);
   * } catch (error) {
   *  console.error('Error occurred while parsing JSON:', error.message);
   * }
   *
   */

  parse(jsonData) {
    this.jobId = this.getProperty(jsonData, "jobId");
    this.taskId = this.getProperty(jsonData, "taskId");
    this.siteId = this.getProperty(jsonData, "siteId");

    // 是否过滤动态url
    this.isCommonFilter = this.getProperty(jsonData, "is_common_filter") ?? false;

    // 是否暴力猜解url路径
    this.isBruteForce = this.getProperty(jsonData, "is_brute_force") ?? false;

    // 是否只是爬取页面不做漏洞扫描
    this.isJustCrawl = this.getProperty(jsonData, "is_just_crawl") ?? false;

    // 并发数量
    this.concurrencyCount = this.getProperty(jsonData, "concurrency_count");

    const target = this.getProperty(jsonData, "target");
    this.targetId = this.getProperty(target, "targetId");
    this.url = this.getProperty(target, "url");
    this.crawlType = this.getProperty(target, "crawl_type");

    this.sessionMessage = this.getProperty(target, "session_message");

    this.autoLogin = this.getProperty(target, "auto_login");
    
    // custom_header是一个map，需要单独处理
    this.customHeader = this.getProperty(target, "custom_header");

    // custom_cookie是一个array，需要单独处理
    this.customCookie = this.getProperty(target, "custom_cookie");

    // 包含该参数的url将被过滤
    this.excludeParam = this.getProperty(target, "exclude_param");
    
    // 该url将被过滤
    this.excludeUrlKeywords = this.getProperty(target, "exclude_url_keywords");
    
    // 该目录下的url将被过滤
    this.excludeDir = this.getProperty(target, "exclude_dir");

    // 该后缀的url将被过滤
    this.excludeSuffix = this.getProperty(target, "exclude_suffix");

    // 该页面包含关键字的url将被过滤
    this.responseUrlKeywords = this.getProperty(target, "response_url_keywords");

    // 特定的element node将被过滤, 过滤可以是通过element id或者element class
    this.elementNodes = this.getProperty(target, "element_nodes");

    // 特定的破坏性操作将被过滤，例如：预期的删除按钮、链接或其他触发删除的元素。
    this.destructiveOperation = this.getProperty(target, "destructive_operation");

    const proxy = this.getProperty(target, "proxy");
    if (proxy === null) {
      this.hasProxy = false;
    } else {
      this.proxyType = this.getProperty(proxy, "type");
      this.proxyHost = this.getProperty(proxy, "host");
      this.proxyPort = this.getProperty(proxy, "port");
      this.proxyUsername = this.getProperty(proxy, "username");
      this.proxyPassword = this.getProperty(proxy, "password");
      this.hasProxy = true;
    }

    const functionSwitch = this.getProperty(target, "function_switch");
    this.functionSwitchDom0 = this.getProperty(functionSwitch, "dom0");
    this.functionSwitchDom2 = this.getProperty(functionSwitch, "dom2");
    this.functionSwitchSpa = this.getProperty(functionSwitch, "spa");
    this.functionSwitchForm = this.getProperty(functionSwitch, "form");
    this.functionSwitchUrlDeduplication = this.getProperty(functionSwitch, "url_deduplication");

    const jsenv = this.getProperty(target, "jsenv");
    this.jsenvSleepTime = this.getProperty(jsenv, "sleep_time");

    const networkOption = this.getProperty(target, "network_option");
    this.maxRetry = this.getProperty(networkOption, "max_retry");
    this.RetrySleep = this.getProperty(networkOption, "retry_sleep");
    this.timeout = this.getProperty(networkOption, "timeout");

    // 自定义插件参数
    this.customPlugin = this.getProperty(target, "custom_plugin");

    const raysaasPolicyOption = this.getProperty(
      target,
      "raysaas_policy_option"
    );
    if (raysaasPolicyOption === null) {
      this.hasRaysaasPolicyOption = false;
    } else {
      this.checkHiddenLink = this.getProperty(
        raysaasPolicyOption,
        "check_hidden_link"
      );
      this.checkHiddenKeyword = this.getProperty(
        raysaasPolicyOption,
        "check_hidden_keyword"
      );
      this.checkTorjan = this.getProperty(raysaasPolicyOption, "check_torjan");
      this.checkSimilarPage = this.getProperty(
        raysaasPolicyOption,
        "check_similar_page"
      );
      this.similarPageValue = this.getProperty(
        raysaasPolicyOption,
        "similar_page_value"
      );
      this.checkKeywordCasesense = this.getProperty(
        raysaasPolicyOption,
        "check_keyword_casesense"
      );
      this.hasRaysaasPolicyOption = true;
    }

    const ruleset = this.getProperty(target, "ruleset");
    if (ruleset === null) {
      this.hasRuleSet = false;
    } else {
      this.inids = this.getProperty(ruleset, "inids");
      this.exfml = this.getProperty(ruleset, "exfml");
      this.exids = this.getProperty(ruleset, "exids");
      this.plugin = this.getProperty(ruleset, "plugin");
      this.hasRuleSet = true;
    }

    const alarm = this.getProperty(jsonData, "alarm");
    if (alarm === null) {
      this.hasAlarmOption = false;
    } else {
      this.alarmType = this.getProperty(alarm, "alarm_type");
      this.alarmTitle = this.getProperty(alarm, "alarm_title");
      this.alarmContent = this.getProperty(alarm, "alarm_content");
      this.hasAlarmOption = true;
    }

    this.createdAt = this.getProperty(jsonData, "created_at");
    this.updatedAt = this.getProperty(jsonData, "updated_at");
  }
}

module.exports = Option;
