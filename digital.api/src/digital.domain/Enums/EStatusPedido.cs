using System.ComponentModel;

namespace digital.domain.Enums
{
    public enum EStatusPedido
    {
        [Description("aberto")]
        ABERTO,
        [Description("fechado")]
        FECHADO,
        [Description("cancelado")]
        CANCELADO
    }
}
