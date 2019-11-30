using System.ComponentModel;

namespace Client.Models
{
    public class JobFormModel : INotifyPropertyChanged, IDataErrorInfo
    {
        private string _clientName;
        private string _carType;
        private string _licencePlate;
        private string _description;
        public bool IsValid { get { return Error == null; } }

        public string this[string columnName]
        {
            get
            {
                string result = string.Empty;
                if (columnName == "ClientName")
                {
                    if (string.IsNullOrEmpty(ClientName))
                        result = "Client name can not be empty";
                }
                if (columnName == "CarType")
                {
                    if (string.IsNullOrEmpty(CarType))
                        result = "Car type can not be empty";
                }
                if (columnName == "LicencePlate")
                {
                    if (string.IsNullOrEmpty(LicencePlate))
                        result = "Licence plate can not be empty";
                }
                if (columnName == "Description")
                {
                    if (Description?.Length <= 10)
                        result = "Description must be 10 characters or more";
                }
                OnPropertyChanged("IsValid");
                return result;
            }
        }
        public string Error
        {
            get
            {
                if (string.IsNullOrEmpty(ClientName))
                    return "Client name can not be empty";
                if (string.IsNullOrEmpty(CarType))
                    return "Car type can not be empty";
                if (string.IsNullOrEmpty(LicencePlate))
                    return "Licence plate can not be empty";
                if (Description?.Length <= 10)
                    return "Description must be 10 characters or more";
                return null;
            }
        }

        public string ClientName
        {
            get
            {
                return _clientName;
            }
            set
            {
                _clientName = value;
                OnPropertyChanged("ClientName");
            }
        }

        public string CarType
        {
            get
            {
                return _carType;
            }
            set
            {
                _carType = value;
                OnPropertyChanged("CarType");
            }
        }

        public string LicencePlate
        {
            get
            {
                return _licencePlate;
            }
            set
            {
                _licencePlate = value;
                OnPropertyChanged("LicencePlate");
            }
        }

        public string Description
        {
            get
            {
                return _description;
            }
            set
            {
                _description = value;
                OnPropertyChanged("Description");
            }
        }

        public event PropertyChangedEventHandler PropertyChanged;
        protected void OnPropertyChanged(string name)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));
        }
    }
}
