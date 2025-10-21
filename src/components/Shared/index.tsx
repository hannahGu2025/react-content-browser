import React from 'react';

export const Loader = () => (
    <div className="loader">Loading...</div>
);

export const ErrorMessage = ({ message }: { message: string }) => (
    <div className="error-message">{message}</div>
);