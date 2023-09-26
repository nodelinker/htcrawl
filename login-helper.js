
let loginHelper = async (page, autoLogin, sleepTime) => {

    let autoDefaultValue = []
    // 登录模拟
    try{
        for (const key in autoLogin) {
            if (key != 'url') {
                const autoNameType = autoLogin[key]; // 该标签下的所有的值
                for (const autoType in autoNameType) {
                    // 获取标签中的值
                    const autoValue = autoNameType[autoType]
                    if (autoType) {
                        await page.type(`input[${key}=${autoType}]`, autoValue);
                    }
                    else {
                        
                        autoDefaultValue.push({autoType: key})
                    }
                }
                
            }
        }
    
        await page.evaluate((autoDefaultValue, sleepTime) => {
            (async () => {
                function sleep(ms) {
                    return new Promise(resolve => setTimeout(resolve, ms));
                }

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
                   
                    try {
                        // debugger;
                        await sleep(sleepTime);
                        await node.click();
                    } catch (e) {
                        console.error(e);
                    }
                }
            })();
        }, autoDefaultValue, sleepTime);
    }catch{}
}

module.exports = loginHelper;