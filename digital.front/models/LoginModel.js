import * as Yup from 'yup'

let LoginModel = Yup.object().shape({
    email: Yup.string()
        .required("um email é obrigatório")
        .email("O formato não corresponde a um email válido"),
    senha: Yup.string()
        .required('A senha é obrigatória')
});

const LoginValidate = async (login) => {
    try {

        await LoginModel.validate(login, {
            abortEarly: false
        })

        return [];

    } catch (error) {
            return error.inner;
    }
}

export {
    LoginModel,
    LoginValidate
};