
using System;
using System.Text.Json.Serialization;

namespace digital.domain.OutputViewModel
{
    public class ServerErrorOutputView
    {
        public ServerErrorOutputView(string errorID, string errorMessage, string source, string moreInformations)
        {
            ErrorID = errorID;
            ErrorMessage = errorMessage;
            Source = source;
            MoreInformations = moreInformations;
        }

        public ServerErrorOutputView(string errorMessage, string source, string moreInformations)
        {
            ErrorID = Guid.NewGuid().ToString();
            ErrorMessage = errorMessage;
            Source = source;
            MoreInformations = moreInformations;
        }

        public string ErrorID { get; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string ErrorMessage { get; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string Source { get; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string MoreInformations { get; }
    }
}
