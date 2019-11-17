using Client.Interfaces;
using Client.Models;
using log4net;
using System;
using System.Collections.ObjectModel;
using System.Windows;
using System.Windows.Controls;

namespace Client
{
    /// <summary>
    /// Interaction logic for MechanicControl.xaml
    /// </summary>
    public partial class MechanicControl : UserControl
    {
        IRepositoryController repo;
        private static readonly ILog log = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        public MechanicControl(IRepositoryController rc)
        {
            InitializeComponent();
            repo = rc;
            Dispatcher.Invoke(async () => AvailableJobs.ItemsSource = await repo.GetAllJobs());
        }

        private void BackButton_Click(object sender, RoutedEventArgs e)
        {
            ((MainWindow)Application.Current.MainWindow).ChangeToControl(typeof(MenuControl));
        }

        private async void RefreshList(object sender, RoutedEventArgs e)
        {
            AvailableJobs.ItemsSource = await repo.GetAllJobs();
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
