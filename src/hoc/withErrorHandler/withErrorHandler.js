import React, { Component, Fragment } from 'react';

import styled from "styled-components";

import TriviaBox from "../../containers/TriviaBox/TriviaBox";
import BoxWrapper from "../../components/UI/BoxWrapper/BoxWrapper";

const ErrorMessage = styled.p`
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    color: red;
    font-weight: bold;
    font-size: 3rem;
`;

const withErrorHandler = ( WrappedComponent, axios ) => {
    return class extends Component {
        state = {
            hasError: null,
            error: null
        }

        static getDerivedStateFromError(error){
            return{
                hasError: true,
                error: error
            }
        }

        render () {
            if(this.state.hasError){
                return (<BoxWrapper>
                            <ErrorMessage>Something went wrong! Please refresh the page and try again.</ErrorMessage>
                       </BoxWrapper>)
            }

            return <WrappedComponent {...this.props}/>
        }
    }
}

export default withErrorHandler;