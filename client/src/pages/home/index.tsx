// import axios from "axios";
import { Button } from "baseui/button";
import { HeadingXXLarge } from "baseui/typography";
import { useSignOut } from "react-auth-kit";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "../commons";
import {useIsAuthenticated} from 'react-auth-kit';

function Home() {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const isAuthenticated = () => {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();

      if (cookie.startsWith("Authorization" + '=')) {
        return true; 
      }
    }
  
    return false; 
  }

  const logout = () => {
    document.cookie = "Authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    navigate("/login");
  };

  return (
    <Container>
      {isAuthenticated()?
          <HeadingXXLarge color="secondary500">Welcome Home!</HeadingXXLarge>:
          <HeadingXXLarge color="secondary500">Hello there!</HeadingXXLarge>
      }
      <div className="flex flex-row gap-1">
        {isAuthenticated() ? 
          <>
            <Button kind="secondary" onClick={logout}>
              Logout
            </Button>
          </>
          :
          <>
            <Link to="/login">
              <Button kind="secondary">Login</Button>
            </Link>
          </>
        }
          <Link to="/anime">
            <Button kind="secondary">Anime</Button>
          </Link>
        </div>
    </Container>
  );
}

export { Home };
