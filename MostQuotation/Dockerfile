# https://hub.docker.com/_/microsoft-dotnet
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /app
EXPOSE 80
WORKDIR /build

RUN curl --silent --location https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y \
  nodejs

# copy csproj and restore as distinct layers
COPY ./*.csproj .
RUN dotnet restore

# copy everything else and build app
COPY . .
WORKDIR /build
RUN dotnet publish -c release -o published --no-cache

WORKDIR /src

FROM node:16 AS build-web
COPY ./ClientApp/package.json /ClientApp/package.json
COPY ./ClientApp/package-lock.json /ClientApp/package-lock.json
WORKDIR /ClientApp
RUN npm ci
COPY ./ClientApp/ /ClientApp
RUN npm run build

# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build /build/published ./
COPY --from=build-web /ClientApp/build ./ClientApp/build
ENTRYPOINT ["dotnet", "MostQuotation.dll"]