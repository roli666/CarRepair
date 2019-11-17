using SharedKernel.Enums;
using SharedKernel.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Client.Models
{
    public class JobViewModel : INotifyPropertyChanged
    {
        private string _clientName;
        private string _carType;
        private string _licencePlate;
        private string _description;
        private DateTimeOffset _dateRegistered;
        private DateTimeOffset? _jobStarted;
        private DateTimeOffset? _jobDone;
        private JobStatus _status;

        private int ID { get; set; }
        
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

        public DateTimeOffset DateRegistered
        {
            get
            {
                return _dateRegistered;
            }
            set
            {
                _dateRegistered = value;
                OnPropertyChanged("DateRegistered");
            }
        }

        public DateTimeOffset? JobStarted
        {
            get
            {
                return _jobStarted;
            }
            set
            {
                _jobStarted = value;
                OnPropertyChanged("JobStarted");
            }
        }

        public DateTimeOffset? JobDone
        {
            get
            {
                return _jobDone;
            }
            set
            {
                _jobDone = value;
                OnPropertyChanged("JobDone");
            }
        }

        public JobStatus Status
        {
            get
            {
                return _status;
            }
            set
            {
                _status = value;
                OnPropertyChanged("Status");
            }
        }

        public JobViewModel(JobModel m)
        {
            ClientName = m.ClientName;
            CarType = m.CarType;
            LicencePlate = m.LicencePlate;
            Description = m.Description;
            DateRegistered = m.DateRegistered;
            JobStarted = m.JobStarted;
            JobDone = m.JobDone;
            Status = m.Status;
            ID = m.ID;
        }

        public static JobModel ToJobModel(JobViewModel m)
        {
            return new JobModel {
                CarType = m.CarType,
                ClientName = m.ClientName,
                DateRegistered = m.DateRegistered,
                Description = m.Description,
                ID = m.ID,
                JobDone = m.JobDone,
                JobStarted = m.JobStarted,
                LicencePlate = m.LicencePlate,
                Status = m.Status
            };
        }

        public JobViewModel()
        {
            Status = JobStatus.Pending;
            DateRegistered = DateTime.Now;
        }

        public event PropertyChangedEventHandler PropertyChanged;
        protected void OnPropertyChanged(string name)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));
        }
    }
}
