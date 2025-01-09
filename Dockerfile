FROM jenkins/jenkins:lts

# Establecer como root para realizar instalaciones
USER root

# Instalar paquetes necesarios para Docker
RUN apt-get update && apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg2 \
    lsb-release \
    sudo \
    && rm -rf /var/lib/apt/lists/*

# Añadir el usuario Jenkins al grupo Docker para permitir el uso de Docker sin sudo
RUN usermod -aG docker jenkins



# Asegurarte de que el contenedor ejecute como el usuario Jenkins
USER jenkins
