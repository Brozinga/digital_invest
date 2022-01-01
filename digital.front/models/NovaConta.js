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
        .required("O nome é obrigatório"),
    email: Yup.string()
        .required("um email é obrigatório")
        .email("O formato não corresponde a um email válido"),
    cpf: Yup.string()
        .required("O CPF é obrigatório")
        .isValidCpf("O CPF informado é inválido"),
    senha: Yup.string()
        .required('A senha é obrigatória')
        .min(8, 'A senha precisa de no mínimo 8 caracteres'),
    confirmSenha: Yup.string()
        .required('A confirmação de senha é obrigatória')
        .oneOf([Yup.ref('senha'), null], 'A confirmação de senha não corresponde a senha informada')
});

export default NovaContaModel;