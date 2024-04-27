import Joi from "joi";

 const newPasswordSchema = Joi.object({
    newPassword: Joi.string()
        .regex(/^(?=.*[A-Z])(?=.*[0-9])/)
        .required()
        .label("new password")
        .messages({
            'string.min': 'Password must be at least 8 characters long',
            'string.pattern.base': 'Password must contain at least one capital letter and one number',
            "string.empty": "The field is required",
        }),
    confirmPassword: Joi.string()
        .valid(Joi.ref('newPassword'))
        .required()
        .label('Confirm Password')
        .messages({ 'any.only': '{{#label}} does not match the new password' })

});

export default newPasswordSchema;