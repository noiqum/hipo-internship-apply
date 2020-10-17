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

    return result;
}