# Kubernetes Examples

These Kubernetes manifests provide logging and log collection examples.

# Contents

## reading-log-files-from-containers

_Note: The following manifests run the `timberio/agent` and `timberio/logging-app` Docker containers.
Containers that run the `agent` require a [timber.io](https://timber.io/) account and api key._

- `logging-app-host-log`

  Creates a Pod that runs `logging-app` and writes its logs to host system.

- `logging-app-pod`

  Creates a Pod that runs `logging-app` and writes its logs to stdout.

- `logging-app-pod-sidecar-log-agent`

  Creates a Pod that runs a `logging-app` and `agent` container. The `logging-app` writes its logs to a file in a shared
  volume, and the `agent` container reads that file and ships it to [timber.io](https://timber.io/).

- `logging-app-pod-sidecar-log-streamer`

  Creates a Pod that runs a `logging-app` and `streamer` sidecar container. The `logging-app` writes its logs to a file in a shared volume, and the `streamer` container reads that file and writes it to its stdout.
