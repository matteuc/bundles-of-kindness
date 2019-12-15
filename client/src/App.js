// import React, { useEffect, useState } from "react";
import React from "react";
import { Route, Switch } from "react-router-dom";
// import { useAuth0 } from "./react-auth0-spa";
import PrivateRoute from "./components/PrivateRoute";
// import API from './utils/API';
import "./App.css";

// import FAIcon from "./components/FAIcon";
// import Loading from "./components/Loading";
import Landing from "./pages/Landing/index";
import NoMatch from "./components/NoMatch";
import NavBarApp from "./components/NavBarApp";
import Logo from "./assets/logo.PNG";

function App() {
  // const user = {
  //   name: "Matt Chen",
  //   email: "matt@email.com",
  //   picture: "https://link.com"
  // }
  // const { loading, user, isAuthenticated } = useAuth0();
  // const [userInfo, setUserInfo] = useState();

  // useEffect(() => {
  //   updateUser();
  // }, [loading]);

  // Retrieve/create userInfo document after Auth0 login
  // const updateUser = () => {
  //   if (isAuthenticated && user && !loading) {
  //     setUserInfo(user);
  //   }
  // };

  // if (loading) {
  //   return (
  //     <div className="App text-center">
  //       <div className="mt-5">
  //         <Loading />
  //       </div>
  //     </div>
  //   );
  // }


  return (
    <div className="App">
      <NavBarApp
        color="rgb(248, 235, 255)"
        accentColor="#5B27BC"
        title={<img style={{marginTop: "10px",height: "40px"}} src={Logo} />}
        center
        routes={[
          {
            name: "Link One",
            path: "/link-one"
          },
          {
            name: "Link Two",
            path: "/link-two"
          },
          {
            name: "Link Three",
            path: "/link-three"
          }
        ]}
        activeStyle={{
          borderBottom: "2px solid #5B27BC"
        }}
      >
        <Switch>
          <Route exact path="/" component={Landing} />
          {/* <PrivateRoute exact path="/private-page" component={PrivateRoute} user={userInfo} /> */}
          <Route component={NoMatch} />
        </Switch>
      </NavBarApp>

    </div>
  );
}

export default App;