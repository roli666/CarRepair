﻿using Client.Business_Logic;
using Client.Interfaces;
using Client.Models;
using log4net;
using SharedKernel.Enums;
using SharedKernel.Models;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace Client
{
    /// <summary>
    /// Interaction logic for AdministratorControl.xaml
    /// </summary>
    public partial class AdministratorControl : UserControl
    {
        private static readonly ILog log = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        IRepositoryController repo;

        public AdministratorControl(IRepositoryController rc)
        {
            InitializeComponent();
            repo = rc;
            Dispatcher.Invoke(async () => ExistingJobs.ItemsSource = await repo.GetAllJobs());
        }

        private void BackButton_Click(object sender, RoutedEventArgs e)
        {
            ((MainWindow)Application.Current.MainWindow).ChangeToControl(typeof(MenuControl));
        }

        private async void AddJob_Click(object sender, RoutedEventArgs e)
        {
            if (string.IsNullOrEmpty(((JobFormModel)DataContext).Error))
            {
                var job = new JobModel
                {
                    CarType = CarType.Text,
                    ClientName = ClientName.Text,
                    DateRegistered = DateTimeOffset.Now,
                    Description = Description.Text,
                    JobDone = null,
                    JobStarted = null,
                    LicencePlate = LicencePlate.Text,
                    Status = JobStatus.Pending
                };
                var ret = await repo.AddJob(job);
                if (!ret)
                {
                    MessageBox.Show("Failed to add job, please check your connection with the server.","Failed to add job",MessageBoxButton.OK,MessageBoxImage.Warning);
                    log.Error($"Couldn't add job:{job}");
                }
                else
                {
                    ExistingJobs.ItemsSource = await repo.GetAllJobs();
                }
            }
        }

        private async void ExistingJobs_RowEditEnding(object sender, DataGridRowEditEndingEventArgs e)
        {
            var ret = await repo.UpdateJob(JobViewModel.ToJobModel((JobViewModel)e.Row.Item));
        }

        private async void RefreshDataGrid(object sender, RoutedEventArgs e)
        {
            ExistingJobs.ItemsSource = await repo.GetAllJobs();
        }

        private void ExistingJobs_PreviewCanExecute(object sender, CanExecuteRoutedEventArgs e)
        {
            DataGrid grid = (DataGrid)sender;
            if (e.Command == DataGrid.DeleteCommand)
            {
                var msgbres = MessageBox.Show("Delete the selected row?", "Confirm Delete", MessageBoxButton.OKCancel);
                if (msgbres == MessageBoxResult.OK)
                {
                    repo.RemoveJob(JobViewModel.ToJobModel(grid.SelectedItem as JobViewModel));
                } 
            }
        }
    }
}
