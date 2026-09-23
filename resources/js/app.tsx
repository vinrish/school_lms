import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

void createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) => {
        const appPages = import.meta.glob([
            './pages/**/*.{tsx,jsx,ts,js}',
            './Pages/**/*.{tsx,jsx,ts,js}',
        ]);
        const modulePages = import.meta.glob([
            '/Modules/*/resources/js/Pages/**/*.{tsx,jsx,ts,js}',
            '/Modules/*/resources/js/pages/**/*.{tsx,jsx,ts,js}',
            '../../Modules/*/resources/js/Pages/**/*.{tsx,jsx,ts,js}',
            '../../Modules/*/resources/js/pages/**/*.{tsx,jsx,ts,js}',
        ]);

        const parts = name.split('/');
        const moduleName = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
        const pagePath = parts.slice(1).join('/');

        const candidateModulePaths = [
            `/Modules/${moduleName}/resources/js/Pages/${pagePath}.tsx`,
            `/Modules/${moduleName}/resources/js/Pages/${pagePath}.jsx`,
            `/Modules/${parts[0]}/resources/js/Pages/${pagePath}.tsx`,
            `/Modules/${parts[0]}/resources/js/Pages/${pagePath}.jsx`,
            `/Modules/${moduleName}/resources/js/Pages/${name}.tsx`,
            `/Modules/${moduleName}/resources/js/Pages/${name}.jsx`,
            `/Modules/${parts[0]}/resources/js/Pages/${name}.tsx`,
            `/Modules/${parts[0]}/resources/js/Pages/${name}.jsx`,
            `../../Modules/${moduleName}/resources/js/Pages/${pagePath}.tsx`,
            `../../Modules/${moduleName}/resources/js/Pages/${pagePath}.jsx`,
            `../../Modules/${parts[0]}/resources/js/Pages/${pagePath}.tsx`,
            `../../Modules/${parts[0]}/resources/js/Pages/${pagePath}.jsx`,
            `../../Modules/${moduleName}/resources/js/Pages/${name}.tsx`,
            `../../Modules/${moduleName}/resources/js/Pages/${name}.jsx`,
            `../../Modules/${parts[0]}/resources/js/Pages/${name}.tsx`,
            `../../Modules/${parts[0]}/resources/js/Pages/${name}.jsx`,
        ];

        for (const path of candidateModulePaths) {
            if (modulePages[path]) {
                return typeof modulePages[path] === 'function'
                    ? (modulePages[path] as () => Promise<unknown>)()
                    : modulePages[path];
            }
        }

        const lowerPagePath = pagePath.toLowerCase().replace(/[-_]/g, '');
        const lowerName = name.toLowerCase().replace(/[-_]/g, '');
        for (const [key, value] of Object.entries(modulePages)) {
            const cleanKey = key.toLowerCase().replace(/[-_]/g, '');
            if (
                cleanKey.endsWith(`/${lowerPagePath}.tsx`) ||
                cleanKey.endsWith(`/${lowerPagePath}.jsx`) ||
                cleanKey.endsWith(`/${lowerName}.tsx`) ||
                cleanKey.endsWith(`/${lowerName}.jsx`)
            ) {
                return typeof value === 'function'
                    ? (value as () => Promise<unknown>)()
                    : value;
            }
        }

        return resolvePageComponent(
            [
                `./pages/${name}.tsx`,
                `./pages/${name}.jsx`,
                `./Pages/${name}.tsx`,
                `./Pages/${name}.jsx`,
            ],
            appPages as Record<string, () => Promise<unknown>>,
        );
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
