const THRALL_LORD = 48;

module.exports = function NoThrallLordCancel(dispatch) {
    let job = -1,
    summoning = false;
    
    dispatch.hook('S_LOGIN', 9, event => { job = event.templateId % 100 - 1 })
    
    dispatch.hook('C_START_SKILL', 1, event => {
        if (summoning) return false;
        
        if(job === 7) {
            const skill = Math.floor((event.skill - 0x4000000) / 10000);
            
            if (skill === THRALL_LORD) {
                summoning = true;
                setTimeout(() => {
                    summoning = false;
                }, 4000);
            }
        }
    })
}