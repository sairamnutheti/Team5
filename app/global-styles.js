import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }
 
  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
  
  .media {
    margin-top: 10px!important;
    margin-bottom: 10px!important;
    margin-right: 25px;
    padding: 0px 10px 0px 10px;
    background-color: #e6e6e6;
  }
  
  .survey-btn {
    margin-top: 22px;
    float: right
  }
  
  .Login {
    padding: 30px 0;
  }

  .Login form {
    padding-top: 40px;
    margin: 0 auto;
    max-width: 350px;
  }
  
  .well-custom {
     margin-top: 40%;
  }
  
  .modal-title-custom {
    font-weight: bold
  }
  
  .login-image {
     display: block;
    margin-left: auto;
    margin-right: auto;
  }
  
  .switch {
  position: relative;
  display: inline-block;
  width: 70px;
  height: 34px;
  margin-top: 20px
}

.switch input {display:none;}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #c70b2b;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #006c68;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
}
`;
