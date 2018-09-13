const {
    INVALID_ARGUMENTS_ERROR,
    MISSING_PROPERTIES_ERROR
} = require('./errors');


const validate = (object, props) => {
    if (!object) {
        throw Error(INVALID_ARGUMENTS_ERROR);
    }

    if (Array.isArray(object)) {
        object.forEach(obj => {
            if (!obj) {
                throw Error(INVALID_ARGUMENTS_ERROR);
            }
        });
    }

    if (!props) {
        return;
    }

    let missingProps = [];

    for (let i = 0; i < props.length; i++) {
        let prop = props[i];

        if (!object[prop]) {
            missingProps.push(prop);
        }
    }

    if (!!missingProps.length) {
        throw Error(`${MISSING_PROPERTIES_ERROR} ${missingProps.join(', ')}`);
    }
};

module.exports = {
    validate
};
