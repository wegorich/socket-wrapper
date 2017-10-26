import socket from './socket';
import { PermissionsRegistry } from '~/some_path';
import { RoutesFactory } from '~/some_path';

export function registerAppPlugins({
    aurelia, 
    plugins, 
    routesFactory, 
    permissionsRegistry
}) {
    plugins.forEach(name => {
        aurelia.use.plugin(name, config => {
            if (config.routes)
                routesFactory.registerRoutes(name, config.routes);
            
            if (config.permissions)
                permissionsRegistry.registerPermissions(Object.keys(config.permissions));
            
            if (config.socketReducers)
                socket.use(config.socketReducers);
        });
    });
}

export function configure(aurelia) {
    let routesFactory = aurelia.container.get(RoutesFactory);
    let permissionsRegistry = aurelia.container.get(PermissionsRegistry);
    let plugins = ['./some-module', ...any];

    registerAppPlugins({
        aurelia, 
        plugins, 
        routesFactory, 
        permissionsRegistry
    });

    socket.connect();
}