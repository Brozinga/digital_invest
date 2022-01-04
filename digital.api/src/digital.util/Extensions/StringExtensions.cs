using System;
using System.Collections;
using System.Reflection;

namespace digital.util.Extensions
{
    public static class StringExtensions
    {
        public static void TrimAllStrings<TSelf>(this TSelf obj)
        {
            if (obj != null)
            {
                if (obj is IEnumerable)
                {
                    foreach (var listItem in obj as IEnumerable)
                    {
                        listItem.TrimAllStrings();
                    }
                }
                else
                {
                    BindingFlags flags = BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.FlattenHierarchy;

                    foreach (PropertyInfo p in obj.GetType().GetProperties(flags))
                    {
                        Type currentNodeType = p.PropertyType;
                        if (currentNodeType == typeof(String))
                        {
                            string currentValue = (string)p.GetValue(obj, null);
                            if (currentValue != null)
                            {
                                p.SetValue(obj, currentValue.Trim(), null);
                            }
                        }
                        else if (currentNodeType != typeof(object) && Type.GetTypeCode(currentNodeType) == TypeCode.Object)
                        {
                            p.GetValue(obj, null).TrimAllStrings();
                        }
                    }
                }
            }
        }
    }
}
