import { FormLogin } from '../../Forms/FormLogin/FormLogin';
import { FormSignup } from '../../Forms/FormSignup/FormSignup';

import './TemplateForms.css'

export const TemplateForms: React.FC<Props> = ({ type }) => {

  return (

    <div className='container-fluid container-form h-100 p-0'>

      <div className="row h-100" >

        <div className="col col-md-4 col-hero"></div>

        <div className="col col-md-8 col-form d-flex justify-content-center align-items-center">

          {
              type === 'login' ?
              <FormLogin /> :
              <FormSignup />
          }

        </div>

      </div>


    </div>
      
  );
}

interface Props {
    type: 'login' | 'signup';
}