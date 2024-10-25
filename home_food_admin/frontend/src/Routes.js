import React from 'react';
import Homepage from './Pages/Components/homepage/Homepage';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Components/Dashboard/Dashboard';
import SuperUserDashboard from './Pages/Components/Dashboard/SuperUserDashboard';
import UserList from './Pages/Components/User/UserList';
import ProtectedRoutes from './protectedRoutes';
import ProtectedCustomerRoutes from './protectedCustomerRoutes';
import Login from './Pages/Components/Login/Login';
import DisplayVideos from './Pages/Components/ManageVideos/displayVideos';
import OrgTable from './Pages/Components/Organisation/OrgManage/OrgTable';
// import DataGridDemo from './Pages/Components/Question/ChecklistProgress';
// import AteRemoteMonitoring from './Pages/Components/Question/Question';
import CatDisplay from './Pages/Components/ManageCategory/CatDisplay';
import ProdAdd from './Pages/Components/ManageProducts/ProdAdd';
import ProdDisplay from './Pages/Components/ManageProducts/ProdDisplay';
import SalDisplay from './Pages/Components/Employee/Sales/SalDisplay';
import StockDisplay from './Pages/Components/Employee/Stock/StockDisplay';
import FormSal from './Pages/Components/Employee/Sales/FormSal';
import RegisterForm from './Pages/Components/RegisterForm';
import Navbar from './Pages/Components/UserDashboard/Navbar';
import ChangePassword from './Pages/Components/Login/ChangePassword';
import ForgotPassword from './Pages/Components/Login/ForgotPassword';
import PlaceDisplay from './Pages/Components/ManagePlace/PlaceDisplay';
import Home from './Pages/Components/homepage/Home';
import Cart from './Pages/Components/Main/pages/Cart';
import HomeMain from './Pages/Components/Main/pages/Home';
import LoginCust from './Pages/Components/Main/pages/Login';
import Feedback from './Pages/Components/Main/pages/Feedback';
import FeedbackUser from './Pages/Components/Employee/ManageFeedback/FeedbackUser';
import ProductList from './Pages/Components/Main/pages/ProductList';
import ProductInfo from './Pages/Components/Main/pages/ProductInfo';
import Register from './Pages/Components/Main/pages/Register';
import HomeCust from './Pages/Components/homepage/HomeCust';
import Service from './Pages/Components/Main/pages/Service';
// import ServiceRequest from './Pages/Components/Employee/ManageService/ServiceRequest';
// import ServiceHistory from './Pages/Components/Employee/ManageService/ServiceHistory';
// import SalesHistory from './Pages/Components/Employee/Sales/SalesHistory';
// import ServiceReport from './Pages/Components/Admin/Service/ServiceReport';
// import OnlineSales from './Pages/Components/Admin/Online/OnlineSales';
// import OfflineSales from './Pages/Components/Admin/Offline/OfflineSales';
import Checkout from './Pages/Components/Main/pages/Checkout';
import Payment from './Pages/Components/Main/pages/Payment';
import ManagePayment from './Pages/Components/Payment/ManagePayment';
import ManageOrder from './Pages/Components/Payment/ManageOrders';
// import ViewOrder from './Pages/Components/Payment/ViewOrder';
import SupplierDisplay from './Pages/Components/ManageSuppliers/SupplierDisplay';
import UserProfile from './Pages/Components/Main/pages/UserProfile';
import Change from './Pages/Components/Main/pages/Change';
import VideoPlayer from './Pages/Components/Videos/videos';
// import NgoList from './Pages/Components/Ngo/NgoList';
// import EmpList from './Pages/Components/Employe/EmpList';
// import DashboardNgo from './Pages/Components/Dashboard/DashboardNgo';
// import DashboardEmp from './Pages/Components/Dashboard/DashboardEmp';
// import ProgramBooking from './Pages/Components/Ngo/ProgramBooking';
// import BookingRequest from './Pages/Components/Ngo/BookingRequest';
// import ProgramBookEmp from './Pages/Components/Employe/ProgramBookEmp';
// import FoodRequest from './Pages/Components/Employe/FoodRequest';
// import ViewOrderEmp from './Pages/Components/Employe/ViewOrderEmp';
// import ViewWork from './Pages/Components/Admin/Work/ViewWork';
// import ViewVol from './Pages/Components/Admin/Volunteer/ViewVol';
// import ViewRescue from './Pages/Components/Admin/Rescue/ViewRescue';
// import ViewGallery from './Pages/Components/Admin/Gallery/ViewGallery';
// import ViewDonation from './Pages/Components/Admin/Donation/ViewDonation';
// import ViewPet from './Pages/Components/Admin/Pet/ViewPet';
// import ViewPetRequest from './Pages/Components/Admin/PetRequest/ViewPetRequest';
// import ViewVaccine from './Pages/Components/Admin/Vaccination/ViewVaccine';
// import ViewVeternity from './Pages/Components/Admin/Veternity/ViewVeternity';
// import ViewCat from './Pages/Components/Admin/Category/ViewCat';
// import ViewMun from './Pages/Components/Admin/Municipal/ViewMun';
// import ViewPol from './Pages/Components/Admin/Police/ViewPol';
// import ViewProfile from './Pages/Components/Admin/Profile/ViewProfile';
// import Aboutus from './Pages/Components/Admin/About/Aboutus';
// import Contactus from './Pages/Components/Admin/Contact/Contactus';
import ViewFarmer from './Pages/Components/Admin/Farmer/ViewFarmer';
import ViewArticle from './Pages/Components/Admin/Article/ViewArticle';
import ViewUser from './Pages/Components/Admin/User/ViewUser';
import ViewCat from './Pages/Components/Admin/Category/ViewCat';
import ViewPurchase from './Pages/Components/Main/pages/ViewPurchase';
import AddProduct from './Pages/Components/Main/pages/AddProduct';
import JobPost from './Pages/Components/Main/pages/JobPost';
import CategoryItem from './Pages/Components/Main/components/CategoryItem';
import CategorySection from './Pages/Components/Main/pages/CategorySection';
import ProductDetails from './Pages/Components/Main/pages/ProductDetails';
import PurchaseFarmer from './Pages/Components/Main/pages/PurchaseFarmer';
import PaymentFarmer from './Pages/Components/Main/pages/PaymentFarmer';
import ArticleFarmer from './Pages/Components/Main/pages/ArticleFarmer';
import ProductUserList from './Pages/Components/Main/pages/ProductUserList';
import CareerUser from './Pages/Components/Main/pages/CareerUser';
import CategoryMain from './Pages/Components/Main/pages/CategoryMain';
import ProductMain from './Pages/Components/Main/pages/ProductMain';
import PurchaseUser from './Pages/Components/Main/pages/PurchaseUser';
import PaymentUser from './Pages/Components/Main/pages/PaymentUser';
import CategoryHome from './Pages/Components/Main/pages/CategoryHome';
import AboutCheff from './Pages/Components/Main/pages/AboutCheff';
import ContactCheff from './Pages/Components/Main/pages/ContactCheff';
import ViewFood from './Pages/Components/Main/pages/ViewFood';
import ViewOrderCheff from './Pages/Components/Main/pages/ViewOrderCheff';
import ViewOrder from './Pages/Components/Admin/Order/ViewOrder';
import ViewPayment from './Pages/Components/Admin/Payment/ViewPayment';
import AddFood from './Pages/Components/Main/pages/AddFood';
import RecipeUser from './Pages/Components/Main/pages/RecipeUser';
import RecipeDetails from './Pages/Components/Main/pages/RecipeDetails';
import Orders from './Pages/Components/Main/pages/Orders';
import Rating from './Pages/Components/Main/pages/Rating';
import Profile from './Pages/Components/Employee/Profile/Profile';
import DeliveredOrder from './Pages/Components/Main/pages/DeliveredOrder';
// import ProductList from './Pages/Components/Main/pages/ProductList';
// import ProtectedRoutes from './Pages/Components/Question/protectedRoutes';

// Customers:
//   Order:
//   Profile:
//   settings:

// Admin:


const MainRoutes = () => {
    return (
        <Routes>
          <Route path="/CustHome" element={<HomeMain />} />
          <Route path="/videos" element={<VideoPlayer />} />
          <Route path="/RecipeDetails" element={<RecipeDetails/>} />
          <Route path="/RecipeUser" element={<RecipeUser/>} />
          <Route path="/AboutCheff" element={<AboutCheff/>} />
          <Route path="/AboutCheff" element={<AboutCheff/>} />
          <Route path="/Product" element={<ProductInfo />} />
          <Route path="/Cart" element={<Cart />} />
          {/* <Route path="/login" element={ <Login />} />     */}
          <Route path="/RegisterForm" element={<RegisterForm/>}/>
          <Route path="/ForgotPassword" element={<ForgotPassword />}/>
          <Route path="/LoginCust" element={<LoginCust />} />
          <Route path="/RegisterCust" element={<Register />} /> 
              <Route element={<ProtectedCustomerRoutes />}>
                  <Route path="/"  element={<HomeCust />} />
                  <Route path="/CustHome" element={<HomeMain />} />
                  <Route path="/displayVideo" element={<DisplayVideos />} />
                  <Route path="/videos" element={<VideoPlayer />} />
                  <Route path="/DeiveredOrder" element={<DeliveredOrder/>}/>
                  <Route path="/profile" element={<Profile/>} />
                  <Route path="/Cart" element={<Cart />} />
                  <Route path="/Orders" element={<Orders/>}/>
                  <Route path="/Rating" element={<Rating/>}/>
                  <Route path="/Payment" element={<Payment />} />
                  <Route path="/Product" element={<ProductInfo />} />
                  <Route path="/UserProfile" element={<UserProfile />} />
                  <Route path="/ProductList" element={<ProductList />} />
                  <Route path="/Feedback" element={<Feedback />} />
                  <Route path="/Payment" element={<Payment />} />
                  <Route path="/Service" element={<Service/>}/>
                  <Route path="/Checkout" element={<Checkout/>}/>
                  <Route path="/CustManageOrder" element={<ManageOrder />}/>
                  <Route path="/CustViewOrder" element={<ViewOrder />} />
                  <Route path="/Change" element={<Change />} />
                  <Route path="/ViewPurchase" element={<ViewPurchase />} />
                  <Route path="/AddProduct" element={<AddProduct />} />
                  <Route path="/JobPost" element={<JobPost />} />
                  <Route path="/Category" element={<CategorySection />} />
                  <Route path="/ProductDetails" element={<ProductDetails />} />
                  <Route path="/ProductList" element={<ProductList />} />
                  <Route path="/PurchaseFarmer" element={<PurchaseFarmer />} />
                  <Route path="/PaymentFarmer" element={<PaymentFarmer />} />
                  <Route path="/ArticleFarmer" element={<ArticleFarmer />} />
                  <Route path="/ProductUserList" element={<ProductUserList />} />
                  <Route path="/CareerUser" element={<CareerUser/>} />
                  <Route path="/CategoryMain" element={<CategoryMain/>} />
                  <Route path="/ProductMain" element={<ProductMain/>} />
                  <Route path="/PurchaseUser" element={<PurchaseUser/>} />
                  <Route path="/PaymentUser" element={<PaymentUser/>} />
                  <Route path="/CategoryHome" element={<CategoryHome/>} />
                  <Route path="/AboutCheff" element={<AboutCheff/>} />
                  <Route path="/Contact" element={<ContactCheff/>} />
                  <Route path="/ViewFood" element={<ViewFood/>} />
                  <Route path="/ViewOrderCheff" element={<ViewOrderCheff/>} />
                  <Route path="/AddFood" element={<AddFood/>} />
                  <Route path="/RecipeUser" element={<RecipeUser/>} />
                  <Route path="/RecipeDetails" element={<RecipeDetails/>} />



              </Route>        
              <Route element={<ProtectedRoutes />}>         
                <Route path="/" element={<Home />} >
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/SuperUserDashboard" element={<SuperUserDashboard/>} />
                <Route path="/ViewArticle" element={<ViewArticle/>}/>
                <Route path="/ViewFarmer" element={<ViewFarmer/>}/>
                <Route path="/ViewUser" element={<ViewUser/>}/>
                <Route path="/ViewCat" element={<ViewCat/>}/>
                <Route path="/ViewOrder1" element={<ViewOrder/>}/>
                <Route path="/ViewPayment" element={<ViewPayment/>}/>
                <Route path="/ChangePassword" element={<ChangePassword/>}/>
                
                {/* <Route path="/Aboutus" element={<Aboutus/>}/>
                <Route path="/Contactus" element={<Contactus/>}/> */}
                {/* <Route path="/ViewRescue" element={<ViewRescue/>}/>
                <Route path="/ViewDonation" element={<ViewDonation/>}/>
                <Route path="/ViewPet" element={<ViewPet/>}/>
                <Route path="/ViewPetRequest" element={<ViewPetRequest/>}/>
                <Route path="/ViewVaccine" element={<ViewVaccine/>}/>
                <Route path="/ViewVeternity" element={<ViewVeternity/>}/>
                <Route path="/ChangePassword" element = {<ChangePassword />} />
                <Route path="/Profile" element={<Profile/>}/> */}
                {/* <Route path="/FeedbackUser" element={<FeedbackUser/>}/>
                <Route path="/ServiceRequest" element={<ServiceRequest/>}/>
                <Route path="/ServiceHistory" element={<ServiceHistory/>}/>
                <Route path="/SalesHistory" element={<SalesHistory/>}/>
                <Route path="/ServiceReport" element={<ServiceReport/>}/>
                <Route path="/Online" element={<OnlineSales/>}/>
                <Route path="/Offline" element={<OfflineSales/>}/>
                <Route path="/ManagePayment" element={<ManagePayment />}/>
                <Route path="/ManageOrder" element={<ManageOrder />}/>
                <Route path="/ViewOrder" element={<ViewOrder />} />
                <Route path="/Place" element={<PlaceDisplay />} />
                <Route path="/Supplier" element={<SupplierDisplay />} />
                <Route path="/NgoList" element={<NgoList/>} />
                <Route path="/EmpList" element={<EmpList/>} />
                <Route path="/DashboardNgo" element={<DashboardNgo/>} />
                <Route path="/DashboardEmp" element={<DashboardEmp/>} /> 
                <Route path="/ProgramBooking" element={<ProgramBooking/>} /> 
                <Route path="/BookingRequest" element={<BookingRequest/>} /> 
                <Route path="/ProgramBookEmp" element={<ProgramBookEmp/>} /> 
                <Route path="/FoodRequest" element={<FoodRequest/>} /> 
                <Route path="/ViewOrderEmp" element={<ViewOrderEmp/>} /> */}
              </Route>
              {/* <Route path="/DashboardUser" element={<Navbar/>}/>  */}
            </Route>                      
         </Routes>//ZJu8nG!&j
    );
}
export default MainRoutes;







