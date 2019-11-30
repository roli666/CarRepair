using Client.Interfaces;
using Client.Models;
using log4net;
using System;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;

namespace Client
{
    /// <summary>
    /// Interaction logic for MechanicControl.xaml
    /// </summary>
    public partial class MechanicControl : UserControl
    {
        private readonly IRepositoryController repo;
        private static readonly ILog log = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        public MechanicControl(IRepositoryController rc)
        {
            InitializeComponent();
            repo = rc;
            repo.RepositoryChangedEvent += RefreshList;
            Dispatcher.Invoke(async () => AvailableJobs.ItemsSource = await repo.GetAllJobs());
        }

        private void BackButton_Click(object sender, RoutedEventArgs e)
        {
            log.Info($"Switching view to {typeof(MenuControl)}");
            ((MainWindow)Application.Current.MainWindow).ChangeToControl(typeof(MenuControl));
        }

        private async Task RefreshList()
        {
            await Dispatcher.InvokeAsync(async () => AvailableJobs.ItemsSource = await repo.GetAllJobs());
        }

        private async void RefreshList(object sender, RoutedEventArgs e)
        {
            await RefreshList();
        }

        private async void RefreshList(object sender, EventArgs e)
        {
            await RefreshList();
        }

        private async void FinishJob(object sender, RoutedEventArgs e)
        {
            var jobVM = ((System.Windows.FrameworkElement)((System.Windows.FrameworkElement)sender).Parent).DataContext as JobViewModel;
            jobVM.JobDone = DateTimeOffset.Now;
            jobVM.Status = SharedKernel.Enums.JobStatus.Done;
            await repo.UpdateJob(JobViewModel.ToJobModel(jobVM));
            AvailableJobs.ItemsSource = await repo.GetAllJobs();
        }
        private async void StartJob(object sender, RoutedEventArgs e)
        {
            var jobVM = ((System.Windows.FrameworkElement)((System.Windows.FrameworkElement)sender).Parent).DataContext as JobViewModel;
            jobVM.JobStarted = DateTimeOffset.Now;
            jobVM.Status = SharedKernel.Enums.JobStatus.InProgress;
            await repo.UpdateJob(JobViewModel.ToJobModel(jobVM));
            AvailableJobs.ItemsSource = await repo.GetAllJobs();
        }
    }
}
