using Client.Business_Logic;
using Client.Interfaces;
using Client.Models;
using log4net;
using System;
using System.Collections.Generic;
using System.Timers;
using System.Windows;
using System.Windows.Controls;

namespace Client
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private readonly IRepositoryController rc;
        private MainWindowModel mwm;
        private List<UserControl> controls;
        private static readonly ILog log = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        public MainWindow()
        {
            InitializeComponent();
            rc = new RepositoryController();
            controls = new List<UserControl>() {
                new MechanicControl(rc),
                new AdministratorControl(rc),
                new MenuControl()
            };
            mwm = new MainWindowModel();
            DataContext = mwm;
            Dispatcher.Invoke(async () => {
                mwm.ServerReachable = await rc.CheckForRepositoryConnection();
            });
            //TODO: replace this with signalr server call
            Timer timer = new Timer(5000);
            timer.Elapsed += CheckConnection;
            timer.Start();
            PresentationControl.Content = controls.Find(c => c.GetType() == typeof(MenuControl));
        }

        public void ChangeToControl(Type UserControl)
        {
            log.Info($"Loading control:{UserControl}");
            PresentationControl.Content = controls.Find(c => c.GetType() == UserControl);
        }

        private async void CheckConnection(object sender, ElapsedEventArgs e)
        {
            mwm.ServerReachable = await rc.CheckForRepositoryConnection();
        }

    }
}
