namespace Yiim.ViewModels
{
    public class PageParams
    {
        public string Name { get; set; }
        private int _current { get; set; }
        public int Current
        {
            get
            {
                if (_current <= 0)
                    _current = 1;
                return _current;
            }
            set
            {
                _current = value;
            }
        }
        private int _size { get; set; }
        public int Size
        {
            get
            {
                if (_size <= 0)
                    _size = 10;
                return _size;
            }
            set
            {
                _size = value;
            }
        }
        public int Type { get; set; }
    }
}
