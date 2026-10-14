---
title: "FinOps in Practice: Cutting Cloud Spend Without Slowing Teams Down"
excerpt: "Most organisations overspend on cloud by 20–35%. A practical FinOps programme recovers that waste while giving engineers more freedom, not less."
category: cloud
tags: [FinOps, AWS, Azure, Cost Optimisation]
date: 2026-09-29
author: "YAADHUM Cloud Practice"
authorRole: "Cloud Management & DevOps"
---

The cloud promised that you would only pay for what you use. In reality, most organisations pay for a great deal they do not use: idle environments, oversized instances, forgotten snapshots and data transfer nobody planned for. Industry surveys consistently estimate that **20–35% of cloud spend is wasted**.

FinOps — the practice of bringing financial accountability to cloud spending — is how mature organisations recover that money. Done well, it does not slow engineering down. It gives teams the information they need to make good trade-offs on their own.

## Start with visibility

You cannot optimise what you cannot see. The first step is always to answer a deceptively simple question: *who is spending what, and why?*

- **Tag everything.** Enforce tags for team, product, environment and cost centre. Untagged resources should be the exception, and reported every week.
- **Separate accounts or subscriptions** by environment and business unit so costs fall naturally into the right buckets.
- **Publish showback reports** so every team sees its own spend and trend, monthly at minimum.

When engineers can see the cost of the services they own, behaviour changes quickly — often before any formal optimisation begins.

## The quick wins

In almost every environment we review, the same handful of actions deliver most of the savings in the first 60 days.

### Rightsize compute

Instances and containers are routinely provisioned for peak load that rarely arrives. Analyse two to four weeks of utilisation and step down instance sizes where CPU and memory stay consistently low.

### Schedule non-production

Development, test and staging environments rarely need to run nights and weekends. Scheduling them to stop outside working hours can cut their cost by around 65%.

### Clean up the forgotten

Unattached volumes, old snapshots, idle load balancers and unused public IP addresses quietly accumulate. A monthly clean-up policy prevents the slow creep.

### Commit to what you know

Once usage is stable, savings plans and reserved capacity offer substantial discounts over on-demand pricing. Commit to your baseline, not your peak.

### Tier your storage

Move infrequently accessed data to cheaper storage classes automatically with lifecycle policies.

## Building a sustainable practice

Quick wins are satisfying, but waste returns unless the organisation changes how it works. A sustainable FinOps practice has three ingredients:

1. **Shared ownership.** Finance, engineering and leadership agree on budgets, unit economics and who is accountable for what.
2. **Automation over policing.** Guardrails such as approved instance types, mandatory tags and budget alerts are enforced by policy, not by email reminders.
3. **Unit economics.** Track cost per customer, per transaction or per environment — so growth in spend can be compared with growth in value.

> The goal of FinOps is not to spend less. It is to spend well — and to know the difference.

## Architecture matters too

Some of the largest savings come from design rather than tuning. Event-driven and serverless services can scale to zero when idle. Caching reduces database and egress costs. Choosing the right region and keeping chatty services close together lowers data transfer charges. These are engineering decisions, which is why FinOps works best when engineers are part of the conversation from the start.

## Where to begin

If you want to understand your own opportunity, start with a short, focused review:

- Export 90 days of billing data and group it by service and team.
- Identify your top ten cost drivers — they usually account for most of the bill.
- Check utilisation for each and list the obvious actions.

Our [cloud management team](/services/cloud-management) runs a two-week FinOps assessment that does exactly this, and our [CloudOps platform](/products/cloudops) keeps the savings in place with continuous recommendations and policy enforcement across AWS, Azure and Google Cloud.
