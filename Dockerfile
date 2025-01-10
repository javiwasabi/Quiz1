FROM jenkins/jenkins:lts

USER root

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    docker.io \
    curl \
    xvfb \
    libglib2.0-0 \
    libnss3 \
    libgconf-2-4 \
    libfontconfig1 \
    libxi6 \
    && rm -rf /var/lib/apt/lists/*

# Instalar Node.js y npm
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm

# Instalar Selenium WebDriver y Chromedriver
RUN npm install -g selenium-webdriver chromedriver

# Verificar las instalaciones
RUN docker --version && node --version && npm --version && chromedriver --version

USER jenkins
