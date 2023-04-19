import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Landing.scss";
import '../pictures/2.jpg';
import logo from '../pictures/Logo.jpg';
import {Spinner} from "../ui/Spinner";
import {Button} from 'components/ui/Button';
import {useParams} from 'react-router-dom';
import PropTypes from "prop-types";

const FormField = props => {
    return (
      <div className="login field">
        <label className="login label">
          {props.label}
        </label>
        <input
          className="login input"
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
          type = {props.type}
          placeholder={props.placeholder}
        />
      </div>
    );
  };
  
  FormField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    type: PropTypes.string
  };

const ProfileEdit = () => {
    const history = useHistory();
    const idParam = useParams().id;
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState(localStorage.getItem('username'));
    const [name, setName] = useState(localStorage.getItem('name'));

  
    const cancel= () => {
      history.push('/profilepage/'+idParam)
    }
  
    const logout = () => {
        localStorage.removeItem('token');
        history.push('/login');
    }

    const saveChanges = async () => {
      try {
        const requestBody = JSON.stringify({username, name, password});
        await api.put("/user/" + localStorage.userId, requestBody);
  
        localStorage.setItem("username", username);
        localStorage.setItem("name", name);

  
        history.push(`/profilepage/` + idParam);
      } catch (error) {
        alert(`Something went wrong during changing user data: \n${handleError(error)}`);
      }
    };
  
    useEffect(() => {
      async function fetchData(idParam) {
        try {
          const response = await api.get("/user/" + idParam);
          setUser(response.data);
        } catch (error) {
          alert(`Something went wrong while fetching the User: \n${handleError(error)}`);
        }
      }
      fetchData(idParam);
    }, [idParam]);
  
    let content = <Spinner/>;
  
    if (idParam !== localStorage.getItem('userId')) {
      content = (
        <div className='editProfile'>
          <p>This is not your profile so that you cannot edit it. 
            <br/>You can edit only yours.
          </p>
          <Button width="100%" onClick={() => cancel()}>
            Back
          </Button>
        </div>
      );
    } else if (user) {
      content = (
        <div className='editProfile'>
          <FormField
            label="New Username:"
            value={username}
            onChange={a => setUsername(a)}
            type = "text"
            placeholder = {user.username}
          />
          <FormField
            label="New Name:"
            value={name}
            onChange={b => setName(b)}
            type = "text"
            placeholder={user.name}
          />
        <FormField
            label="New Password:"
            value={password}
            onChange={b => setPassword(b)}
            type = "text"
            placeholder={user.password}
          />
          <Button width="100%" onClick={() => saveChanges()}>
            Save
          </Button>
          <Button className="redbtn" width="100%" onClick={() => cancel()}>
            Cancel
          </Button>
        </div>
      )
    }
  
    return (
        <BaseContainer className="landing container">

            <div className="landing navbar">
                <img className="landing img" src={logo} alt="LOL"/>
                <nav>
                    <ul className="nav__links">
                        <li><a href="allusers">Find User</a></li>
                        <li><a href="landing">Home</a></li>
                        <li><a href="leaderboard">Leaderboard</a></li>
                    </ul>
                </nav>
                <div className="landing button-container">

                    <button
                        className="button"
                        onClick={() => logout()}
                    >
                        Logout
                    </button>
                </div>
            </div>
        {content}
      </BaseContainer>
    );
  }
  

export default ProfileEdit;
