import toast, { Toaster } from 'react-hot-toast'
//DOCUMENTATION: https://react-hot-toast.com/docs/toast

import { FiAlertTriangle, FiInfo, FiCheckCircle, FiXCircle, FiX } from "react-icons/fi"

const notify = toast;

const defaultNotification = (message, title, icon, configurations) => {
    return notify(
        (t) => (
            <div className="notification-container">
                <div>
                    <header>
                        {icon}<h4>{title}</h4>
                    </header>
                    <section>
                        {(typeof (message) == "string") ?
                            message : message.map(e => (<p>{e}</p>))
                        }
                    </section>
                </div>
                <button type="button" onClick={() => notify.dismiss(t.id)}><FiX /></button>
            </div>
        ),
        configurations
    );
}


export const success = (message, title = "Sucesso", icon = <FiCheckCircle />) => {
    return defaultNotification(message, title, icon,
        {
            position: 'top-right',
            duration: 5000,
            className: 'toasterdefault btn-success',
        })
}

export const warning = (message, title = "Atenção", icon = <FiAlertTriangle />) => {
    return defaultNotification(message, title, icon,
        {
            position: 'top-right',
            duration: 5000,
            className: 'toasterdefault btn-warning',
        })
}

export const danger = (message, title = "Erro", icon = <FiXCircle />) => {
    return defaultNotification(message, title, icon, {
        position: 'top-right',
        duration: 10000,
        className: 'toasterdefault btn-danger',
    })
}

export const primary = (message, title = "Informação", icon = <FiInfo />) => {
    return defaultNotification(message, title, icon,
        {
            position: 'top-right',
            duration: 5000,
            className: 'toasterdefault btn-primary',
        })
}

export const gray = (message, title = "Informação", icon = <FiInfo />) => {
    return defaultNotification(message, title, icon,
        {
            position: 'top-right',
            duration: 5000,
            className: 'toasterdefault btn-default',
        })
}

export const white = (message, title = "Informação", icon = <FiInfo />) => {
    return defaultNotification(message, title, icon,
        {
            position: 'top-right',
            duration: 5000,
            className: 'toasterdefault btn-white'
        })
}

export const Notifications = Toaster;
export default notify