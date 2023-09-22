
let loginHelper = async (page, autoLogin, sleepTime) => {

    let autoDefaultValue = []
    // 登录模拟
    for (const key in autoLogin) {
        if (key != 'url') {
            autoNameType = autoLogin[key]; // 该标签下的所有的值
            for (const autoType in autoNameType) {
                // 获取标签中的值
                autoValue = autoNameType[autoType]
                if (autoType) {
                    await page.type(`input[${key}=${autoType}]`, autoValue);
                }
                else {
                    
                    autoDefaultValue.push({autoType: key})
                }
            }
            
        }
    }

    await page.evaluate((autoDefaultValue) => {
        (async () => {
            for (const inputName in autoDefaultValue) {
                // 赋值默认值
                const valueInput = document.querySelector(`input[${autoDefaultValue[inputName]}=${inputName}]`);
                if (valueInput) {
                    valueInput.value = valueInput.defaultValue;
                }
            }
            let nodeListSubmit = document.querySelectorAll("[type=submit]");
            if (nodeListSubmit.length == 0){
                nodeListSubmit = document.querySelectorAll("[type=button]");
            }
            for (let node of nodeListSubmit) {
                await window.sleep(sleepTime / 10);
                try {
                    await node.click();
                } catch (e) {
                    console.error(e);
                }
            }
        })();
    }, autoDefaultValue);

}

module.exports = loginHelper;