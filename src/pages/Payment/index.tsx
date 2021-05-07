import React, {useEffect} from 'react'

const Payment: React.FC = () => {

    useEffect(() => {
    
        const script = document.createElement('script');
    
        script.src = '//code.jivosite.com/widget/AIh2Mhazzn';
        script.async = true;
    
        document.body.appendChild(script);
        return () => {
          document.body.removeChild(script);
        };
      }, []);

    return(
        <h1>Updating.</h1>
    )
}
export default Payment