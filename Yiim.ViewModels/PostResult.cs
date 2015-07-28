namespace Yiim.ViewModels
{
    public class PostResult<T> : ResultBase
    {
        public T Id { get; set; }
        public bool IsCreated { get; set; }
    }
}
