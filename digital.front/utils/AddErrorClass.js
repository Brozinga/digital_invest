export default function InputAddClassNameErro(errors, setErrors) {

    function IfErrorList (name) {
        if (errors.includes(name))
            return "error"

        return ""
    }

    function AddErrors (name) {
        setErrors([...errors, name])
    }

    function AddErrosArray (array) {
        setErrors([...array])
    }

    function RemoveErrors (name) {
        if (errors.length > 0)
            setErrors(errors.filter(e => e != name))
    }

    return {
        IfErrorList,
        AddErrors,
        AddErrosArray,
        RemoveErrors
    }
}