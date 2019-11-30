using System.ComponentModel;

namespace Client.Models
{
    public class MainWindowModel : INotifyPropertyChanged
    {
        private bool _mainWindowActive = true;
        private bool _serverReachable;
        private string _currentControl = "Main Window";

        public string CurrentControl
        {
            get
            {
                return _currentControl;
            }
            set
            {
                _currentControl = value;
                OnPropertyChanged("CurrentControl");
            }
        }

        public bool MainWindowActive {
            get
            {
                return _mainWindowActive;
            }
            set
            {
                _mainWindowActive = value;
                OnPropertyChanged("MainWindowActive");
            }
        }

        public bool ServerReachable
        {
            get
            {
                return _serverReachable;
            }
            set
            {
                _serverReachable = value;
                OnPropertyChanged("ServerReachable");
            }
        }

        public event PropertyChangedEventHandler PropertyChanged;
        protected void OnPropertyChanged(string name)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));
        }
    }
}
