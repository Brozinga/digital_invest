import * as Yup from 'yup'
import { isValidCPF } from "../utils"

Yup.addMethod(Yup.string, "isValidCpf", function (errorMessage) {
    return this.test('test-cpf-format', errorMessage, function (value) {
        const { path, createError } = this;

        return isValidCPF(value) ||
            createError({ path, message: errorMessage })
    })
})


let NovaContaModel = Yup.object().shape({
    nome: Yup.string()
        .trim()
        .required("O nome é obrigatório"),
    email: Yup.string()
        .trim()
        .required("O email é obrigatório")
        .email("O formato não corresponde a um email válido"),
    cpf: Yup.string()
        .trim()
        .isValidCpf("O CPF informado é inválido"),
    senha: Yup.string()
        .trim()
        .required('A senha é obrigatória')
        .min(6, 'A senha precisa de no mínimo 6 caracteres'),
    confirmSenha: Yup.string()
        .trim()
        .oneOf([Yup.ref('senha'), null], 'A confirmação de senha não corresponde a senha informada')
});

const NovaContaValidate = async (novaConta) => {
    try {
        await NovaContaModel.validate(novaConta, {
            abortEarly: false
        })

        return [];

    } catch (error) {
        return error.inner;
    }
}

export {
    NovaContaModel,
    NovaContaValidate

};