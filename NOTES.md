### PROCEDIMIENTO CREACIÓN API GETWAY GRPC PARA EL LOGGING MICROSERVICE

1 - Crear el proyecto con el siguiente comando:

```
nest new nombre_del_proyecto
```

2 - Eliminar los archivos que vienen por defecto para el controalador y el servicio

3 - Crear el un nuevo recurso llamado Logging con el siguiente comando (Revisar documentación Nest para mas detalle):
nest generate resource logging

4 - Creamos una carpeta en la raiz del proyecto (proto) y allí creamos el archivo logging.proto con la siguinete configuración inicial que posteriormente sera modificada:

```javascript
syntax = "proto3";

package logging;

service LoggingService {
  rpc pin (Empty) returns (string) {}
}
```

5 - Instalamos la dependencia para trabajar con gRPC:
npm i @nestjs/microservices @grpc/grpc-js @grpc/proto-loader ts-proto

6 - Ejecutamos el comando para crear el archivo logging.ts basado en el archivo logging.proto con la libraria ts-proto (solo funciono en mi caso ejecutandolo con npx):

```
npx protoc --plugin=protoc-gen-ts_proto=.\node_modules\.bin\protoc-gen-ts_proto.cmd --ts_proto_out=. --ts_proto_opt=nestJs=true ./proto/auth.proto
```

7 - Creamos la configuración del cliente gRPC en el archivo logging.module.ts que se acaba de generar e importando las librarias requeridas para la implementación:

```javascript
import { Module } from '@nestjs/common';
import { LoggingService } from './logging.service';
import { LoggingController } from './logging.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'logging',
        transport: Transport.GRPC,
        options: {
          package: 'logging',
          protoPath: join(__dirname, '../proto/logging.proto'),
        },
      },
    ]),
  ],
  controllers: [LoggingController],
  providers: [LoggingService],
})
export class LoggingModule {}
```

8 -

### PROCEDIMIENTO CREACIÓN SERVER GRPC PARA EL LOGGING MICROSERVICE

1 - El proyecto ya se encuentra creado, se deben eliminar los archivos de la aplicación que venia por defecto.

2 - Crear el un nuevo recurso llamado Logging con el siguiente comando (Revisar documentación Nest para mas detalle):

```
nest generate resource logging
```

Se deben escoger las siguinetes opciones

- Microservice (Non HTTP)
-

Failed to execute command: node @nestjs/schematics:resource --name=logging --no-dry-run --no-skip-import --language="ts" --source-root="src" --spec --no-flat --spec-file-suffix="spec"
