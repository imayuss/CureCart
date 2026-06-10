'use client';

import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

// SwaggerUI requires window object, so we load it dynamically
const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

export default function ApiDocs() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">CureCart API Documentation</h1>
        <p className="text-gray-600 mt-2">
          Interactive documentation for the CureCart backend APIs, intended for developers and recruiters.
        </p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <SwaggerUI url="/api/swagger" />
      </div>
    </div>
  );
}
