FROM python:3.12-slim

ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=1000

ENV DEBIAN_FRONTEND=noninteractive

# # Python
# ENV PYTHONDONTWRITEBYTECODE=1
# ENV PYTHONUNBUFFERED=1
# ENV PIP_DISABLE_PIP_VERSION_CHECK=1

# Odoo
ENV ODOO_HOME=/workspace/odoo
ENV ODOO_CONFIG=/etc/odoo/odoo.conf

# ============================================================
# System dependencies
# ============================================================

RUN apt-get update && apt-get install -y --no-install-recommends \
    # Development
    git \
    vim \
    curl \
    wget \
    sudo \
    ca-certificates \
    build-essential \
    gcc \
    g++ \
    make \
    pkg-config \
    # PostgreSQL
    libpq-dev \
    # XML / HTML
    libxml2-dev \
    libxslt1-dev \
    # LDAP
    libldap2-dev \
    libsasl2-dev \
    # SSL / crypto
    libssl-dev \
    libffi-dev \
    # Image processing
    libjpeg-dev \
    libpng-dev \
    libfreetype6-dev \
    libtiff-dev \
    libopenjp2-7-dev \
    libwebp-dev \
    liblcms2-dev \
    # Text rendering
    libharfbuzz-dev \
    libfribidi-dev \
    # Other libraries
    libxcb1-dev \
    zlib1g-dev \
    libzip-dev \
    # Fonts
    fonts-dejavu \
    # Process utilities
    procps \
    && rm -rf /var/lib/apt/lists/*

# ============================================================
# Development user
# ============================================================

RUN groupadd \
        --gid ${USER_GID} \
        ${USERNAME} \
    && useradd \
        --uid ${USER_UID} \
        --gid ${USER_GID} \
        --create-home \
        --shell /bin/bash \
        ${USERNAME} \
    && echo "${USERNAME} ALL=(ALL) NOPASSWD:ALL" \
        > /etc/sudoers.d/${USERNAME} \
    && chmod 0440 /etc/sudoers.d/${USERNAME}

# ============================================================
# Workspace
# ============================================================

RUN mkdir -p \
    /workspace \
    /workspace/odoo \
    /workspace/addons-custom \
    # /workspace/addons/custom \
    /workspace/addons/enterprise \
    /var/lib/odoo \
    /etc/odoo

RUN chown -R ${USERNAME}:${USERNAME} \
    /workspace \
    /var/lib/odoo \
    /etc/odoo

# ============================================================
# Python tooling
# ============================================================

RUN python -m pip install --no-cache-dir --upgrade \
    pip \
    setuptools \
    wheel \
    # virtualenv \
    debugpy

# ============================================================
# Shell configuration
# ============================================================

RUN echo 'alias ll="ls -lah"' >> /home/${USERNAME}/.bashrc \
    && echo 'export PATH="/workspace/.local/bin:$PATH"' \
        >> /home/${USERNAME}/.bashrc

# ============================================================
# User
# ============================================================

USER ${USERNAME}

WORKDIR /workspace

# ============================================================
# Default command
# ============================================================

CMD ["sleep", "infinity"]