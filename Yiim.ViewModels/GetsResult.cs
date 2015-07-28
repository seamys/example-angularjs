using System.Collections.Generic;

namespace Yiim.ViewModels
{
    public class GetsResult<T> : ResultBase
    {
        public int Total { get; set; }
        public List<T> Data { get; set; }
    }
}
