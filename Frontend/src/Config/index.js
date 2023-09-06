let config;

const dev = {
    path : route => '/dev/' + route
}

!config && (config = dev)

export default config;