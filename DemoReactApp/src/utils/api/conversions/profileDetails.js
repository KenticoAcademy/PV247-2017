export const convertFromServerDetails = (serverDetails) => ({
    ...serverDetails.customData || '{}',
    email: serverDetails.email,
});

export const convertToServerDetails = (details) => ({
    customData: {
        ...details,
        email: undefined,
    }
});