import { Link } from "react-router-dom";
import { Routes } from "enums/routes";

export const ViewHome = () => (
  <div>
    <h1>Home Page</h1>

    <nav>
      <ul>
        <li>
          <Link to={Routes.SIGN_UP}>Sign-Up Flow</Link>
        </li>

        <li>
          <Link to={Routes.ONBOARDING}>On-boarding Flow</Link>
        </li>
      </ul>
    </nav>
  </div>
);
