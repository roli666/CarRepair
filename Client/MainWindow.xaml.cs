using Client.Business_Logic;
using Client.Interfaces;
using Client.Models;
using log4net;
using log4net.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Timers;
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
                new MenuControl(rc)
            };
            mwm = new MainWindowModel();
            DataContext = mwm;
            Dispatcher.Invoke(async () => {
                mwm.ServerReachable = await rc.CheckForRepositoryConnection();
            });
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
