"use strick";

const response = ({ isSuccess, code, message }, result) => {
    return { isSuccess, code, message, result: result };
};
const errResponse = ({ isSuccess, code, message }) => {
    return { isSuccess, code, message };
};
const Message = {
    // success
    SUCCESS: { isSuccess: true, code: 2000, message: "Less than saved score." },
    SUCCESS_CREATE: { isSuccess: true, code: 2001, message: "It has been successed to create a new user." },
    SUCCESS_UPDATE: { isSuccess: true, code: 2002, message: "It has been successed to update the new user." },
    // validation
    EMPTY_NICKNAME: { isSuccess: false, code: 3000, message: "Nickname is required." },
    EMPTY_PASSWORD: { isSuccess: false, code: 3001, message: "Password is required." },
    LENGTH_NICKNAME: { isSuccess: false, code: 3002, message: "Nickname must be between 4 and 8 letters long." },
    LENGTH_PASSWORD: { isSuccess: false, code: 3003, message: "Password must be between 4 and 10 letters long." },
    NAN_SCORE: { isSuccess: false, code: 3004, message: "Score is not a number." },
    //
    NOT_MATCHED_PASSWORD: { isSuccess: false, code: 4000, message: "It's a wrong password." },
    // Error
    SERVER_ERROR: { isSuccess: false, code: 5000, message: "Server Error" },
};

module.exports = {
    response,
    errResponse,
    Message,
};
