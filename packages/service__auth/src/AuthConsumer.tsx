import React from 'react';
import { AuthContext } from './context';

function defaultTo(value, defaultValue) {
	return value == null || value !== value ? defaultValue : value;
}

const AuthConsumer = (props: any) => {
	return (
		// @ts-ignore
		<AuthContext.Consumer>
			{(context: any) => {
				const {
					status,
					error,
					errorPage,
					signInPage,
					children
				} = context;
                switch(status) {
                    case 'pending':
                        signInPage ? signInPage : 'Loading...';
                        return;
                    case 'error':
                        return errorPage ? errorPage : (<div>
							Oh no
							<div>
								<pre>
									{
										// @ts-ignore
										error.message
									}
								</pre>
							</div>
						</div>);
                    case 'success':
                        return children ? children(defaultTo(context, null)) : <>Something went wrong...</>;
                    default:
                        return <>Something went wrong...</>;
                }
            }

        }
		</AuthContext.Consumer>
	);
};

export default AuthConsumer;
