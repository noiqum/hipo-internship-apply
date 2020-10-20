


export const moveUp = {
    animate: {
        y: -30,
        opacity: 1,
        transition: {
            duration: 1.5,
            ease: "easeInOut",
            durationDelay: 6
        }
    },
    initial: {
        opacity: 0
    },
    exit: {
        y: -20,
        opacity: 0,
        transition: {
            duration: 2,
            ease: "easeIn"
        }
    }

}

export const checkDate = (date) => {
    const last = Date.parse("October 31,2020");
    if (date < last) { return true }
    return false
}

const checkName = (value) => {

    if (value === '') {
        return {
            valid: false,
            msg: 'name is required'
        }
    }
    if (value.length < 3) {
        return {
            valid: false,
            msg: 'min 3 character long'
        }
    }
    return {
        valid: true,
        msg: null
    }

}
const checkEmail = (value) => {
    if (value === '') {
        return {
            valid: false,
            msg: 'email is required'
        }
    } else if (value !== '') {
        if (
            !(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                value
            ))
        ) {
            return { valid: false, msg: 'invalid email' };
        } else {
            return {
                valid: true,
                msg: null,
            };
        }
    }
    return {
        valid: true,
        msg: ''
    }
}

const checkPassword = (value) => {
    if (value === '') {
        return { valid: false, msg: 'password is required' };
    } else if (value !== '') {
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(value)) {
            return { valid: false, msg: 'invalid password' };
        } else {
            return { valid: true, msg: null };
        }
    }
    else {
        return {
            valid: true,
            msg: null
        }
    }
}
const checkExist = (value) => {

    if (value === '') {

        return { valid: false, msg: 'this field is required' }
    } else {
        return {
            valid: true,
            msg: null
        }
    }
}
export const checkValidity = (value, type) => {
    let result;
    if (type === 'name') {
        return result = checkName(value)
    }
    if (type === 'email') {
        return result = checkEmail(value);
    }
    if (type === 'password') {
        return result = checkPassword(value)
    }
    if (type === 'cv') {
        return result = checkExist(value)
    }
    if (type === 'notes') {
        return result = checkExist(value)
    }

    return result;
}

export const checkPayload = (payload) => {
    let result = {
        done: true,
        error: null,
        msg: ''
    }
    const fields = Object.entries(payload);
    fields.forEach((elm) => {
        if (checkExist(elm[1]).valid) {
            return
        } else {
            result.done = false;
            result.error = elm[0];
            result.msg = `${elm[0]} is required`
        }
    })
    return result;

}
export const timeBreak = (cl, time, ...args) => {
    setTimeout(() => { cl(args) }, time)
}

export const createAppUrl = 'https://hipolabs.com/api/internship-applications/';
export const corsURL = "https://cors-anywhere.herokuapp.com/";
export const cv = "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OSAwIG9iagooRDoyMDE4MTEwMjEzMzE0N1owMCcwMCcpCmVuZG9iagoxIDAgb2JqCjw8IC9UaXRsZSAxNiAwIFIgL1Byb2R1Y2VyIDE3IDAgUiAvQ3JlYXRvciAxOCAwIFIgL0NyZWF0aW9uRGF0ZSAxOSAwIFIgL01vZERhdGUKMTkgMCBSID4+CmVuZG9iagp4cmVmCjAgMjAKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDA1NDQxIDAwMDAwIG4gCjAwMDAwMDAzMTMgMDAwMDAgbiAKMDAwMDAwMzI4NyAwMDAwMCBuIAowMDAwMDAwMDIyIDAwMDAwIG4gCjAwMDAwMDAyOTQgMDAwMDAgbiAKMDAwMDAwMDQxOCAwMDAwMCBuIAowMDAwMDAzMjUxIDAwMDAwIG4gCjAwMDAwMDM0NTkgMDAwMDAgbiAKMDAwMDAwMzQyMSAwMDAwMCBuIAowMDAwMDAwNTE1IDAwMDAwIG4gCjAwMDAwMDMyMzAgMDAwMDAgbiAKMDAwMDAwMzM3MSAwMDAwMCBuIAowMDAwMDAzNjYzIDAwMDAwIG4gCjAwMDAwMDM5MjIgMDAwMDAgbiAKMDAwMDAwNTI2OSAwMDAwMCBuIAowMDAwMDA1MjkwIDAwMDAwIG4gCjAwMDAwMDUzMjAgMDAwMDAgbiAKMDAwMDAwNTM3MyAwMDAwMCBuIAowMDAwMDA1Mzk5IDAwMDAwIG4gCnRyYWlsZXIKPDwgL1NpemUgMjAgL1Jvb3QgMTIgMCBSIC9JbmZvIDEgMCBSIC9JRCBbIDw1NjUyNDQwNDY2ZjBmY2UyZjg2ZGI3NGMxMDE4ODMwOD4KPDU2NTI0NDA0NjZmMGZjZTJmODZkYjc0YzEwMTg4MzA4PiBdID4+CnN0YXJ0eHJlZgo1NTQ2CiUlRU9GCg==";

