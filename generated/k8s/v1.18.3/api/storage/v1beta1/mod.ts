/* Generated for api/storage/v1beta1/mod.ts */
import {
  PersistentVolumeSpec,
  TopologySelectorTerm,
} from "../../core/v1/mod.ts";
import {
  ListMeta,
  ObjectMeta,
  Time,
} from "../../../apimachinery/pkg/apis/meta/v1/mod.ts";

/** CSIDriver captures information about a Container Storage Interface (CSI) volume driver deployed on the cluster. CSI drivers do not need to create the CSIDriver object directly. Instead they may use the cluster-driver-registrar sidecar container. When deployed with a CSI driver it automatically creates a CSIDriver object representing the driver. Kubernetes attach detach controller uses this object to determine whether attach is required. Kubelet uses this object to determine whether pod information needs to be passed on mount. CSIDriver objects are non-namespaced. */
export type CSIDriver = {
  apiVersion: "storage.k8s.io/v1beta1";
  kind: "CSIDriver";

  /** Standard object metadata. metadata.Name indicates the name of the CSI driver that this object refers to; it MUST be the same name returned by the CSI GetPluginName() call for that driver. The driver name must be 63 characters or less, beginning and ending with an alphanumeric character ([a-z0-9A-Z]) with dashes (-), dots (.), and alphanumerics between. More info: https:git.k8s.iocommunitycontributorsdevelsig-architectureapi-conventions.md#metadata */
  metadata?: ObjectMeta;

  /** Specification of the CSI Driver. */
  spec: CSIDriverSpec;
};
export function createCSIDriver<
  T extends Omit<CSIDriver, "apiVersion" | "kind">,
>(data: T): CSIDriver & T & Pick<CSIDriver, "apiVersion" | "kind"> {
  return { apiVersion: "storage.k8s.io/v1beta1", kind: "CSIDriver", ...data };
}

/** CSIDriverList is a collection of CSIDriver objects. */
export type CSIDriverList = {
  apiVersion: "storage.k8s.io/v1beta1";

  /** items is the list of CSIDriver */
  items: CSIDriver[];
  kind: "CSIDriverList";

  /** Standard list metadata More info: https:git.k8s.iocommunitycontributorsdevelsig-architectureapi-conventions.md#metadata */
  metadata?: ListMeta;
};
export function createCSIDriverList<
  T extends Omit<CSIDriverList, "apiVersion" | "kind">,
>(data: T): CSIDriverList & T & Pick<CSIDriverList, "apiVersion" | "kind"> {
  return {
    apiVersion: "storage.k8s.io/v1beta1",
    kind: "CSIDriverList",
    ...data,
  };
}

/** CSIDriverSpec is the specification of a CSIDriver. */
export type CSIDriverSpec = {
  /** attachRequired indicates this CSI volume driver requires an attach operation (because it implements the CSI ControllerPublishVolume() method), and that the Kubernetes attach detach controller should call the attach volume interface which checks the volumeattachment status and waits until the volume is attached before proceeding to mounting. The CSI external-attacher coordinates with CSI volume driver and updates the volumeattachment status when the attach operation is complete. If the CSIDriverRegistry feature gate is enabled and the value is specified to false, the attach operation will be skipped. Otherwise the attach operation will be called. */
  attachRequired?: boolean;

  /** If set to true, podInfoOnMount indicates this CSI volume driver requires additional pod information (like podName, podUID, etc.) during mount operations. If set to false, pod information will not be passed on mount. Default is false. The CSI driver specifies podInfoOnMount as part of driver deployment. If true, Kubelet will pass pod information as VolumeContext in the CSI NodePublishVolume() calls. The CSI driver is responsible for parsing and validating the information passed in as VolumeContext. The following VolumeConext will be passed if podInfoOnMount is set to true. This list might grow, but the prefix will be used. "csi.storage.k8s.iopod.name": pod.Name "csi.storage.k8s.iopod.namespace": pod.Namespace "csi.storage.k8s.iopod.uid": string(pod.UID) "csi.storage.k8s.ioephemeral": "true" iff the volume is an ephemeral inline volume
                                defined by a CSIVolumeSource, otherwise "false"

"csi.storage.k8s.ioephemeral" is a new feature in Kubernetes 1.16. It is only required for drivers which support both the "Persistent" and "Ephemeral" VolumeLifecycleMode. Other drivers can leave pod info disabled andor ignore this field. As Kubernetes 1.15 doesn't support this field, drivers can only support one mode when deployed on such a cluster and the deployment determines which mode that is, for example via a command line parameter of the driver. */
  podInfoOnMount?: boolean;

  /** VolumeLifecycleModes defines what kind of volumes this CSI volume driver supports. The default if the list is empty is "Persistent", which is the usage defined by the CSI specification and implemented in Kubernetes via the usual PVPVC mechanism. The other mode is "Ephemeral". In this mode, volumes are defined inline inside the pod spec with CSIVolumeSource and their lifecycle is tied to the lifecycle of that pod. A driver has to be aware of this because it is only going to get a NodePublishVolume call for such a volume. For more information about implementing this mode, see https:kubernetes-csi.github.iodocsephemeral-local-volumes.html A driver can support one or more of these modes and more modes may be added in the future. */
  volumeLifecycleModes?: string[];
};

/** DEPRECATED - This group version of CSINode is deprecated by storagev1CSINode. See the release notes for more information. CSINode holds information about all CSI drivers installed on a node. CSI drivers do not need to create the CSINode object directly. As long as they use the node-driver-registrar sidecar container, the kubelet will automatically populate the CSINode object for the CSI driver as part of kubelet plugin registration. CSINode has the same name as a node. If the object is missing, it means either there are no CSI Drivers available on the node, or the Kubelet version is low enough that it doesn't create this object. CSINode has an OwnerReference that points to the corresponding node object. */
export type CSINode = {
  apiVersion: "storage.k8s.io/v1beta1";
  kind: "CSINode";

  /** metadata.name must be the Kubernetes node name. */
  metadata?: ObjectMeta;

  /** spec is the specification of CSINode */
  spec: CSINodeSpec;
};
export function createCSINode<T extends Omit<CSINode, "apiVersion" | "kind">>(
  data: T,
): CSINode & T & Pick<CSINode, "apiVersion" | "kind"> {
  return { apiVersion: "storage.k8s.io/v1beta1", kind: "CSINode", ...data };
}

/** CSINodeDriver holds information about the specification of one CSI driver installed on a node */
export type CSINodeDriver = {
  /** allocatable represents the volume resources of a node that are available for scheduling. */
  allocatable?: VolumeNodeResources;

  /** This is the name of the CSI driver that this object refers to. This MUST be the same name returned by the CSI GetPluginName() call for that driver. */
  name: string;

  /** nodeID of the node from the driver point of view. This field enables Kubernetes to communicate with storage systems that do not share the same nomenclature for nodes. For example, Kubernetes may refer to a given node as "node1", but the storage system may refer to the same node as "nodeA". When Kubernetes issues a command to the storage system to attach a volume to a specific node, it can use this field to refer to the node name using the ID that the storage system will understand, e.g. "nodeA" instead of "node1". This field is required. */
  nodeID: string;

  /** topologyKeys is the list of keys supported by the driver. When a driver is initialized on a cluster, it provides a set of topology keys that it understands (e.g. "company.comzone", "company.comregion"). When a driver is initialized on a node, it provides the same topology keys along with values. Kubelet will expose these topology keys as labels on its own node object. When Kubernetes does topology aware provisioning, it can use this list to determine which labels it should retrieve from the node object and pass back to the driver. It is possible for different nodes to use different topology keys. This can be empty if driver does not support topology. */
  topologyKeys?: string[];
};

/** CSINodeList is a collection of CSINode objects. */
export type CSINodeList = {
  apiVersion: "storage.k8s.io/v1beta1";

  /** items is the list of CSINode */
  items: CSINode[];
  kind: "CSINodeList";

  /** Standard list metadata More info: https:git.k8s.iocommunitycontributorsdevelsig-architectureapi-conventions.md#metadata */
  metadata?: ListMeta;
};
export function createCSINodeList<
  T extends Omit<CSINodeList, "apiVersion" | "kind">,
>(data: T): CSINodeList & T & Pick<CSINodeList, "apiVersion" | "kind"> {
  return { apiVersion: "storage.k8s.io/v1beta1", kind: "CSINodeList", ...data };
}

/** CSINodeSpec holds information about the specification of all CSI drivers installed on a node */
export type CSINodeSpec = {
  /** drivers is a list of information of all CSI Drivers existing on a node. If all drivers in the list are uninstalled, this can become empty. */
  drivers: CSINodeDriver[];
};

/** StorageClass describes the parameters for a class of storage for which PersistentVolumes can be dynamically provisioned.

StorageClasses are non-namespaced; the name of the storage class according to etcd is in ObjectMeta.Name. */
export type StorageClass = {
  /** AllowVolumeExpansion shows whether the storage class allow volume expand */
  allowVolumeExpansion?: boolean;

  /** Restrict the node topologies where volumes can be dynamically provisioned. Each volume plugin defines its own supported topology specifications. An empty TopologySelectorTerm list means there is no topology restriction. This field is only honored by servers that enable the VolumeScheduling feature. */
  allowedTopologies?: TopologySelectorTerm[];
  apiVersion: "storage.k8s.io/v1beta1";
  kind: "StorageClass";

  /** Standard object's metadata. More info: https:git.k8s.iocommunitycontributorsdevelsig-architectureapi-conventions.md#metadata */
  metadata?: ObjectMeta;

  /** Dynamically provisioned PersistentVolumes of this storage class are created with these mountOptions, e.g. ["ro", "soft"]. Not validated - mount of the PVs will simply fail if one is invalid. */
  mountOptions?: string[];

  /** Parameters holds the parameters for the provisioner that should create volumes of this storage class. */
  parameters?: {
    [key: string]: string;
  };

  /** Provisioner indicates the type of the provisioner. */
  provisioner: string;

  /** Dynamically provisioned PersistentVolumes of this storage class are created with this reclaimPolicy. Defaults to Delete. */
  reclaimPolicy?: string;

  /** VolumeBindingMode indicates how PersistentVolumeClaims should be provisioned and bound.  When unset, VolumeBindingImmediate is used. This field is only honored by servers that enable the VolumeScheduling feature. */
  volumeBindingMode?: string;
};
export function createStorageClass<
  T extends Omit<StorageClass, "apiVersion" | "kind">,
>(data: T): StorageClass & T & Pick<StorageClass, "apiVersion" | "kind"> {
  return {
    apiVersion: "storage.k8s.io/v1beta1",
    kind: "StorageClass",
    ...data,
  };
}

/** StorageClassList is a collection of storage classes. */
export type StorageClassList = {
  apiVersion: "storage.k8s.io/v1beta1";

  /** Items is the list of StorageClasses */
  items: StorageClass[];
  kind: "StorageClassList";

  /** Standard list metadata More info: https:git.k8s.iocommunitycontributorsdevelsig-architectureapi-conventions.md#metadata */
  metadata?: ListMeta;
};
export function createStorageClassList<
  T extends Omit<StorageClassList, "apiVersion" | "kind">,
>(
  data: T,
): StorageClassList & T & Pick<StorageClassList, "apiVersion" | "kind"> {
  return {
    apiVersion: "storage.k8s.io/v1beta1",
    kind: "StorageClassList",
    ...data,
  };
}

/** VolumeAttachment captures the intent to attach or detach the specified volume tofrom the specified node.

VolumeAttachment objects are non-namespaced. */
export type VolumeAttachment = {
  apiVersion: "storage.k8s.io/v1beta1";
  kind: "VolumeAttachment";

  /** Standard object metadata. More info: https:git.k8s.iocommunitycontributorsdevelsig-architectureapi-conventions.md#metadata */
  metadata?: ObjectMeta;

  /** Specification of the desired attachdetach volume behavior. Populated by the Kubernetes system. */
  spec: VolumeAttachmentSpec;

  /** Status of the VolumeAttachment request. Populated by the entity completing the attach or detach operation, i.e. the external-attacher. */
  status?: VolumeAttachmentStatus;
};
export function createVolumeAttachment<
  T extends Omit<VolumeAttachment, "apiVersion" | "kind">,
>(
  data: T,
): VolumeAttachment & T & Pick<VolumeAttachment, "apiVersion" | "kind"> {
  return {
    apiVersion: "storage.k8s.io/v1beta1",
    kind: "VolumeAttachment",
    ...data,
  };
}

/** VolumeAttachmentList is a collection of VolumeAttachment objects. */
export type VolumeAttachmentList = {
  apiVersion: "storage.k8s.io/v1beta1";

  /** Items is the list of VolumeAttachments */
  items: VolumeAttachment[];
  kind: "VolumeAttachmentList";

  /** Standard list metadata More info: https:git.k8s.iocommunitycontributorsdevelsig-architectureapi-conventions.md#metadata */
  metadata?: ListMeta;
};
export function createVolumeAttachmentList<
  T extends Omit<VolumeAttachmentList, "apiVersion" | "kind">,
>(
  data: T,
):
  & VolumeAttachmentList
  & T
  & Pick<VolumeAttachmentList, "apiVersion" | "kind"> {
  return {
    apiVersion: "storage.k8s.io/v1beta1",
    kind: "VolumeAttachmentList",
    ...data,
  };
}

/** VolumeAttachmentSource represents a volume that should be attached. Right now only PersistenVolumes can be attached via external attacher, in future we may allow also inline volumes in pods. Exactly one member can be set. */
export type VolumeAttachmentSource = {
  /** inlineVolumeSpec contains all the information necessary to attach a persistent volume defined by a pod's inline VolumeSource. This field is populated only for the CSIMigration feature. It contains translated fields from a pod's inline VolumeSource to a PersistentVolumeSpec. This field is alpha-level and is only honored by servers that enabled the CSIMigration feature. */
  inlineVolumeSpec?: PersistentVolumeSpec;

  /** Name of the persistent volume to attach. */
  persistentVolumeName?: string;
};

/** VolumeAttachmentSpec is the specification of a VolumeAttachment request. */
export type VolumeAttachmentSpec = {
  /** Attacher indicates the name of the volume driver that MUST handle this request. This is the name returned by GetPluginName(). */
  attacher: string;

  /** The node that the volume should be attached to. */
  nodeName: string;

  /** Source represents the volume that should be attached. */
  source: VolumeAttachmentSource;
};

/** VolumeAttachmentStatus is the status of a VolumeAttachment request. */
export type VolumeAttachmentStatus = {
  /** The last error encountered during attach operation, if any. This field must only be set by the entity completing the attach operation, i.e. the external-attacher. */
  attachError?: VolumeError;

  /** Indicates the volume is successfully attached. This field must only be set by the entity completing the attach operation, i.e. the external-attacher. */
  attached: boolean;

  /** Upon successful attach, this field is populated with any information returned by the attach operation that must be passed into subsequent WaitForAttach or Mount calls. This field must only be set by the entity completing the attach operation, i.e. the external-attacher. */
  attachmentMetadata?: {
    [key: string]: string;
  };

  /** The last error encountered during detach operation, if any. This field must only be set by the entity completing the detach operation, i.e. the external-attacher. */
  detachError?: VolumeError;
};

/** VolumeError captures an error encountered during a volume operation. */
export type VolumeError = {
  /** String detailing the error encountered during Attach or Detach operation. This string may be logged, so it should not contain sensitive information. */
  message?: string;

  /** Time the error was encountered. */
  time?: Time;
};

/** VolumeNodeResources is a set of resource limits for scheduling of volumes. */
export type VolumeNodeResources = {
  /** Maximum number of unique volumes managed by the CSI driver that can be used on a node. A volume that is both attached and mounted on a node is considered to be used once, not twice. The same rule applies for a unique volume that is shared among multiple pods on the same node. If this field is nil, then the supported number of volumes on this node is unbounded. */
  count?: number;
};
