---
layout: post
title: "Installing Documentum Administrator 6SP1 (Patch Release) on IBM Websphere 6.1.0.23"
---

I've spent the majority of the last 2 days trying to get DA 6SP1 Patch Release to install properly on IBM Websphere 6.1.0.23. It had been a while since I'd last done the install, and I fell into the same traps as last time, forgetting where to set the class loader and so forth. After getting past these I was left with the application unhelpfully still showing a white screen and error messages that revealed (looking back) very little about the true nature of the problem. Having finally conquered the problem, I thought I would provide the steps necessary so that anyone else trying to get a WDK application working on Websphere as at least one more thing to try.
<!--more-->
Grab a copy of da.war from the EMC Powerlink Download site.
<ul>
  <li>Unpack da.war and add the following files to a directory</li>
  <li>Put dfc.properties into WEB-INF/classes (As described in the deployment guide)</li>
  <li>ibm-web-ext.xmi &amp; ibm-web-ext.xmi goes into WEB-INF - <a href="https://solutions.emc.com/emcsolutionview.asp?id=esg91105">https://solutions.emc.com/emcsolutionview.asp?id=esg91105</a></li>
  <li>Find a copy of xml.jar on the Websphere App Server in 'Websphere\AppServer\java\jre' and put in 'WEB-INF\lib' <a href="https://solutions.emc.com/emcsolutionview.asp?id=esg93106">- https://solutions.emc.com/emcsolutionview.asp?id=esg93106</a></li>
  <li>Install the application using the IBM Administration Console.</li>
  <li>Change the order the classes are loaded in by expanding the Applications node and click the Enterprise Applications node. Select the application called da_war (or equivalent wdk app). Click the Manage Modules link. Click the da.war link. In the Class loader order drop-down list, select the option 'Classes loaded with application class loader first' - <a href="https://solutions.emc.com/emcsolutionview.asp?id=esg93177">https://solutions.emc.com/emcsolutionview.asp?id=esg93177</a></li>
  <li>You can then save and start the application.</li>
</ul>
The xml.jar file is appropriate for D6SP1 only, previous D6 versions have a slightly different set of instructions (see linked support note). Any feedback, corrections, suggestions greatly appreciated.
