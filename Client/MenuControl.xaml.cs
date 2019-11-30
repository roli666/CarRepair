using log4net;
using System.Windows;
using System.Windows.Controls;

namespace Client
{
    /// <summary>
    /// Interaction logic for MenuControl.xaml
    /// </summary>
    public partial class MenuControl : UserControl
    {
        private static readonly ILog log = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        public MenuControl()
        {
            InitializeComponent();
        }
        private void MechButton_Click(object sender, RoutedEventArgs e)
        {
            log.Info($"Switching to view:{typeof(MechanicControl)}");
            ((MainWindow)Application.Current.MainWindow).ChangeToControl(typeof(MechanicControl));
        }

        private void AdminButton_Click(object sender, RoutedEventArgs e)
        {
            log.Info($"Switching to view:{typeof(AdministratorControl)}");
            ((MainWindow)Application.Current.MainWindow).ChangeToControl(typeof(AdministratorControl));
        }
    }
}
