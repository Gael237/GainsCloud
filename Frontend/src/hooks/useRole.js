import useAuth from "./useAuth";

const useRole = () => {
    const { user } = useAuth()
    return {
        isCoach: user?.rol === 'coach',
        isClient: user?.rol === 'client',
        rol: user?.rol,
    }
}

export default useRole